import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 });

export async function retrieve(query: string): Promise<string[]> {
  const key = `q:${query.toLowerCase()}`;
  const hit = cache.get<string[]>(key);
  if (hit) return hit;
  const docs = [
    `Relevant snippet for ${query}`
  ];
  cache.set(key, docs);
  return docs;
}
