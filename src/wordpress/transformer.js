// import { getPostCategories } from "./fetch";

export async function transformPost(post) {
  try {
    post.title = post.title.rendered;
    post.content = post.content.rendered;
    post.excerpt = post.excerpt.rendered;
    // post.categories = await getPostCategories(post)
    return post;
  } catch (err) {
    console.error('Error in transformPost: ', err);
  }
}

export async function transformCategory(data) {
  return data;
}
