import EntitiesRepo from 'datocms-client/lib/local/EntitiesRepo';

export default function(client, previewMode) {
  return Promise.all([
    client.get('/site', { include: 'item_types,item_types.fields' }),
    client.items.all(
      { version: previewMode ? 'latest' : 'published' },
      { deserializeResponse: false, allPages: true }
    )
  ]).then(([site, allItems]) => new EntitiesRepo(site, allItems));
}
