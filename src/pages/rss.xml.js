import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const columnas = (await getCollection('columnas', (c) => !c.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  return rss({
    title: 'Pensamiento Colectivo',
    description: 'Columnas de opinión y documentos para el debate público.',
    site: context.site,
    items: columnas.map((c) => ({
      title: c.data.title,
      description: c.data.summary,
      pubDate: c.data.date,
      link: `/columnas/${c.id}/`,
    })),
    customData: '<language>es-cl</language>',
  });
}
