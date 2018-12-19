import { isArray, cloneDeep } from 'lodash';

export default class DatoNormalizer {
  constructor(options = { transformers: [], maxDepth: 3 }) {
    this.options = options;
  }

  transform({ content, models, fields }) {
    const maxDepth = this.options.maxDepth;
    const requiredFields = fields.filter(f => !!f.validators.required);

    // TODO check if this.options.transformers contains a custom transformer
    content = content.map(item => {
      // default transform
      const model = models.find(m => m.id === item.item_type);
      if (!model) console.warn('Unable to find model for', item.id);

      const required = Object.keys(item).filter(key =>
        requiredFields.find(field => field.apiKey === key)
      );

      const meta = {
        ctime: item.createdAt,
        mtime: item.updatedAt,
        currentVersion: item.currentVersion,
        publishedVersion: item.publishedVersion,
        contentType: {
          id: item.itemType,
          name: model.apiKey
        },
        required
      };

      delete item.createdAt;
      delete item.updatedAt;
      delete item.currentVersion;
      delete item.publishedVersion;
      delete item.isValid;

      return { ...item, meta };
    });

    // resolve links
    content.map(item => {
      Object.keys(item)
        .filter(key => isArray(item[key]))
        .forEach(key => {
          const links = item[key].map(link => this._resolveLinks(link, content, maxDepth));
          item[key] = links.length === 1 ? links[0] : links;
          // console.log(`resolved ${key} for ${item.meta.contentType.name} ${item.id}`);
        });

      return item;
    });

    return { content, models, fields };
  }

  _resolveLinks(id, items, maxDepth) {
    if (maxDepth <= 0) return null;
    if (typeof id !== 'string') return id;

    const item = items.find(item => item.id === id);
    if (!item) {
      console.warn(`Couldn't find item with id ${id}`);
      return null;
    }
    const clone = cloneDeep(item);
    Object.keys(clone)
      .filter(key => isArray(clone[key]))
      .forEach(key => {
        const links = clone[key].map(link => this._resolveLinks(link, items, maxDepth - 1));
        clone[key] = links.length === 1 ? links[0] : links;
        // console.log(`resolved ${key} for ${clone.meta.contentType.name} ${clone.id}`);
      });

    return clone;
  }
}

// Normalized Object
// {
//   meta: {
//     ctime: "2018-03-26T16:15:25.443Z", // createdAt
//     mtime: "2018-03-26T16:15:25.555Z" // updatedAt
//     currentVersion: '4236',
//     publishedVersion: '4236',
//     contentType: {
//       id: '123',
//       name: 'foo'
//     },
//     required: []
//   },
//   ...
// }
