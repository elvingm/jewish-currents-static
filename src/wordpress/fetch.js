import axios from 'axios';
import { flatten } from 'lodash';
import wp from './config';
import { transformPost, transformCategory } from './transformer';

function getAll(request) {
  return request.then(response => {
    if (!response._paging || !response._paging.next) {
      return response;
    }
    // Request the next page and return both responses as one collection
    return Promise.all([response, getAll(response._paging.next)]).then(responses =>
      flatten(responses)
    );
  });
}

export async function getPosts(count) {
  const posts = await wp
    .posts()
    .perPage(count || 10)
    .embed();
  const transformed = posts.map(transformPost);
  return transformed;
}

export async function getCategories() {
  const categories = await wp.categories();
  const transformed = await Promise.all(categories.map(transformCategory));
  return transformed;
}

export async function getAuthors() {
  const authors = await getAll(wp.users());
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

export async function getPostsByCategory(id) {
  const posts = await wp
    .posts()
    .perPage(100)
    .category(id)
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
