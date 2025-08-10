import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles', ({ data }) => {
    return data.draft !== true;
  });

  const searchData = articles.map((article) => ({
    slug: article.slug,
    title: article.data.title,
    description: article.data.description,
    content: article.body,
    tags: article.data.tags,
    author: article.data.author,
    publishDate: article.data.publishDate.toISOString(),
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
