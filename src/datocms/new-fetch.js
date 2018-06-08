import { SiteClient, Loader } from 'datocms-client';
// import FileCache from './cache/file';

// const cache = new FileCache({ refresh: process.env.REFRESH_FILE_CACHE });
const client = new SiteClient('0ef9d273001e4484d53bec08550899');
const loader = new Loader(client);

export default async () => {
  await loader.load();

  console.log(loader);
  console.log(loader.itemsRepo);
};
