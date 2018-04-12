export function transformPost(post) {
  post.title = post.title.rendered;
  post.content = post.content.rendered;
  post.excerpt = post.excerpt.rendered;
  post.author = post._embedded.author[0];
  post.featuredMedia = post._embedded['wp:featuredmedia']
    ? post._embedded['wp:featuredmedia'][0]
    : null;
  const terms = post._embedded['wp:term']
    ? post._embedded['wp:term'].reduce((a, b) => a.concat(b))
    : [];
  post.categories = terms.length > 0 ? terms.filter(t => t.taxonomy === 'category') : [];
  post.tags = terms.length > 0 ? terms.filter(t => t.taxonomy === 'post_tag') : [];
  return post;
}

export async function transformCategory(data) {
  return data;
}
