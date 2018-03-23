import wp from './config';
import { transformPost } from './transformer';

export async function getPosts() {
  const response = await wp
    .posts()
    .then(data => {
      return data.map(post => ({
        ...transformPost(post)
      }));
    })
    .catch(err => {
      console.log(err);
    });

  return response;
}
