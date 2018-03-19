import datoClient from './config';
import transform from './transformer';

export default async function getData() {
  const response = await datoClient.items.all({ 'filter[type]': 'post' });
  const mapped = response.map(data => ({
    id: data.id.toLowerCase(),
    ...transform(data)
  }));
  return mapped;
}
