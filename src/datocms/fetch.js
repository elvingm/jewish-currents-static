import FileCache from './cache/file';
import DatoClient from './client';
import DatoNormalizer from './normalizer';

if (process.env.REFRESH_FILE_CACHE) console.log('REFRESHING CACHE...');
// const cache = new FileCache({ refresh: process.env.REFRESH_FILE_CACHE });
const client = new DatoClient({ token: '0ef9d273001e4484d53bec08550899' });
const normalizer = new DatoNormalizer();

// function handleJSONSyntaxError(error) {
//   if (error.message.includes('Unexpected token') && error.message.includes('in JSON at position')) {
//     console.warn('Unable to read from cache, fetching new data');
//     return null;
//   }

//   throw error;
// }

export default async () => {
  // check cache
  // let data = await cache.read().catch(handleJSONSyntaxError);
  let data;

  // fetch and transform data if none in cache
  if (!data) {
    data = await client.data();

    // normalize data
    data = await normalizer.transform(data);

    // validate / save data
    // await cache.write(data);
  }

  // return data
  return data;
};
