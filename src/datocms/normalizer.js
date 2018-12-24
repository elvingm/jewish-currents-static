import File from 'datocms-client/lib/local/fields/File';
import { includes, isArray, isUndefined } from 'lodash';

export default class DatoNormalizer {
  constructor(options = { transformers: [] }) {
    this.options = options;
  }

  transform(content) {
    File.prototype.toMap = function toMap() {
      return {
        format: isUndefined(this) ? undefined : this.format,
        size: isUndefined(this) ? undefined : this.size,
        width: isUndefined(this) ? undefined : this.width,
        height: isUndefined(this) ? undefined : this.height,
        title: isUndefined(this) ? undefined : this.title,
        alt: isUndefined(this) ? undefined : this.alt,
        url: isUndefined(this) ? undefined : this.url(),
        path: isUndefined(this) ? undefined : this.path
      };
    };

    const requiredFieldsPerModel = {};
    const modelBlacklist = ['aboutPage', 'tags'];

    const normalizedContent = {};

    Object.keys(content).forEach(model => {
      if (!includes(modelBlacklist, model)) {
        normalizedContent[model] = [];
        const modelContent = isArray(content[model]) ? content[model] : [content[model]];

        modelContent.forEach(record => {
          try {
            const normalizedRecord = record.toMap();

            // Lazily record all required fields per model.
            if (requiredFieldsPerModel[model] === undefined) {
              requiredFieldsPerModel[model] = record.fields
                .filter(f => !!f.validators.required)
                .map(f => f.apiKey);
            }

            normalizedRecord.meta = {
              ctime: normalizedRecord.createdAt,
              mtime: normalizedRecord.updatedAt,
              contentType: { id: normalizedRecord.id, name: normalizedRecord.itemType },
              required: requiredFieldsPerModel[model]
            };

            normalizedContent[model].push(normalizedRecord);
          } catch (error) {} /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
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
