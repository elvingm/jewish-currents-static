import { isArray, includes } from 'lodash';

export default class DatoNormalizer {
  constructor(options = { transformers: [] }) {
    this.options = options;
  }

  transform(content) {
    const requiredFieldsPerModel = {};
    const modelBlacklist = ['aboutPage', 'tags'];

    const normalizedContent = {};

    Object.keys(content).forEach(model => {
      if (!includes(modelBlacklist, model)) {
        normalizedContent[model] = [];
        const modelContent = isArray(content[model]) ? content[model] : [content[model]];

        modelContent.forEach(record => {
          const normalizedRecord = record.toMap();

          if (requiredFieldsPerModel[model] === undefined) {
            requiredFieldsPerModel[model] = record.fields
              .filter(f => !!f.validators.required)
              .map(f => f.apiKey);
          }

          normalizedRecord.meta = {
            ctime: record.createdAt,
            mtime: record.updatedAt,
            currentVersion: record.entity.payload.relationships.currentVersion.data.id,
            publishedVersion: record.entity.payload.relationships.publishedVersion.data.id,
            contentType: { id: record.itemType.id, name: record.itemType.apiKey },
            required: requiredFieldsPerModel[model]
          };

          normalizedContent[model].push(normalizedRecord);
        });
      }
    });

    return normalizedContent;
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
