import axios from 'axios';
import wp from './config';
import { transformPost, transformCategory } from './transformer';

export async function getPosts() {
  const posts = await wp.posts().embed();
  const transformed = posts.map(transformPost);
  return transformed;
}

export async function getCategories() {
  const categories = await wp.categories();
  const transformed = await Promise.all(categories.map(transformCategory));
  return transformed;
}

export async function getAuthors() {
  const authors = await wp.users();
  return authors;
}

export function getCategoryById(id) {
  return wp
    .categories()
    .id(id)
    .get();
}

export function getAuthorById(id) {
  return wp
    .users()
    .id(id)
    .get();
}

export async function getPostsByAuthor(id) {
  const posts = await wp
    .posts()
    .author(id)
    .embed();
  const transformed = posts.map(transformPost);
  return transformed;
}

export function getPostCategories(post) {
  const link = post._links['wp:term'].find(term => term.taxonomy === 'category');
  return axios.get(link.href);
}

export function getPostAuthor(post) {
  const link = post._links.author[0];
  return axios.get(link.href);
}

export function getPostFeaturedMedia(post) {
  const link = post._links['wp:featuredmedia'][0];
  return axios.get(link.href);
}
