import axios from 'axios';
import wp from './config';
import { transformPost, transformCategory } from './transformer';

export async function getPosts() {
  const posts = await wp.posts();
  const transformed = await Promise.all(posts.map(transformPost));
  return transformed;
}

export async function getCategories() {
  const categories = await wp.categories();
  const transformed = await Promise.all(categories.map(transformCategory));
  return transformed;
}

export function getCategoryById(id) {
  return wp.categories().id(id);
}

export function getPostCategories(post) {
  const link = post._links['wp:term'].find(term => term.taxonomy === 'category');
  return axios.get(link.href).then(res => res.data);
}
