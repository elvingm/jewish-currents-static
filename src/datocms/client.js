import { Loader, SiteClient } from 'datocms-client';

export default class DatoClient {
  constructor(credentials = { token: null }) {
    if (!credentials.token) throw new Error('Missing Datocms Credentials');
    this.client = new SiteClient(credentials.token);
    this.loader = new Loader(this.client, false);
  }

  async data() {
    await this.loader.load();
    return this.loader.itemsRepo.collectionsByType;
  }
}
