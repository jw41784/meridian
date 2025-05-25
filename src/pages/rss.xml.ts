import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => {
    return data.draft !== true;
  });

  const sortedArticles = articles.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: 'Project Meridian Blog',
    description: 'Insights and updates from the forefront of innovation',
    site: context.site!,
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishDate,
      description: article.data.description,
      link: `/articles/${article.slug}/`,
      author: article.data.author,
      categories: article.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}