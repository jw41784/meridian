import { useState, useEffect, useRef } from 'react';
import lunr from 'lunr';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishDate: string;
}

interface SearchDocument {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: string;
  publishDate: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<lunr.Index | null>(null);
  const documentsRef = useRef<SearchDocument[]>([]);

  useEffect(() => {
    // Load search data and build index
    const loadSearchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}search.json`);
        const documents: SearchDocument[] = await response.json();
        documentsRef.current = documents;

        // Build Lunr index
        indexRef.current = lunr(function () {
          this.ref('slug');
          this.field('title', { boost: 10 });
          this.field('description', { boost: 5 });
          this.field('content');
          this.field('tags', { boost: 3 });
          this.field('author');

          documents.forEach((doc) => {
            this.add({
              ...doc,
              tags: doc.tags.join(' '),
            });
          });
        });
      } catch (error) {
        console.error('Failed to load search index:', error);
      }
    };

    loadSearchData();
  }, []);

  useEffect(() => {
    // Close results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim() || !indexRef.current) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const searchResults = indexRef.current.search(searchQuery);
      const mappedResults = searchResults.slice(0, 5).map((result) => {
        const doc = documentsRef.current.find((d) => d.slug === result.ref);
        return doc ? {
          slug: doc.slug,
          title: doc.title,
          description: doc.description,
          author: doc.author,
          publishDate: doc.publishDate,
        } : null;
      }).filter((r): r is SearchResult => r !== null);

      setResults(mappedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="w-full px-4 py-2 pr-10 border border-meridian-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-meridian-burgundy focus:border-transparent"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-meridian-steel"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-meridian-light-gray rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-meridian-steel">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.slug} className="border-b border-meridian-light-gray last:border-0">
                  <a
                    href={`${import.meta.env.BASE_URL}articles/${result.slug}`}
                    className="block p-4 hover:bg-meridian-light-gray transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <h3 className="font-semibold text-meridian-dark mb-1">
                      {result.title}
                    </h3>
                    <p className="text-sm text-meridian-steel mb-1 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="text-xs text-meridian-steel">
                      {result.author} • {formatDate(result.publishDate)}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-meridian-steel">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}