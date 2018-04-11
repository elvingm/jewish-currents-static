import { SiteClient } from 'datocms-client';
import { uniq } from 'lodash';

export default class DatoClient {
  constructor(credentials = { token: null }) {
    if (!credentials.token) throw new Error('Missing Datocms Credentials');
    this.client = new SiteClient(credentials.token);
  }

  // Array with no length returns all content
  async data() {
    const models = await this._getModels().catch(e => {
      throw e;
    });
    const content = await this._getContent().catch(e => {
      throw e;
    });

    let fields = [];
    const uniqueFields = uniq(models.reduce((arr, m) => arr.concat(m.fields), []));
    uniqueFields.forEach(field => fields.push(this._getField(field)));
    fields = await Promise.all(fields).catch(e => {
      throw e;
    });

    return { models, content, fields };
  }

  _getModels(params = { version: 'published' }, options = { allPages: true }) {
    return this.client.itemTypes.all(params, options);
  }

  _getContent(params = { version: 'published' }, options = { allPages: true }) {
    return this.client.items.all(params, options);
  }

  _getField(itemTypeID) {
    return this.client.fields.find(itemTypeID);
  }
}
