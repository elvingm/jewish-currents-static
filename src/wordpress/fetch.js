import wp from './config';
import { transformPost, transformCategory } from './transformer';

export async function getPosts() {
  const response = await wp
    .posts()
    .then(data =>
      data.map(post => ({
        ...transformPost(post)
      }))
    )
    .catch(err => {
      console.log(err);
    });

  return response;
}

export async function getPostById(id) {
  const post = await wp
    .posts()
    .id(id)
    .then(transformPost)
    .catch(err => {
      console.log(err);
    });

  return post;
}

export async function getCategoryById(id) {
  const category = await wp
    .categories()
    .id(id)
    .then(transformCategory)
    .catch(err => {
      console.log(err);
    });

  return category;
}
