import { isArray, flatten } from 'lodash';
import { SITE_PRIMARY_COLOR, POST_PRIMARY_COLOR } from './src/App/util/constants';

export const paginateItems = ({ items, parent, pageSize, pageToken = 'page', route, decorate }) => {
  const itemsCopy = [...items]; // Make a copy of the items
  const pages = []; // Make an array for all of the different pages

  while (itemsCopy.length) {
    // Splice out all of the items into separate pages using a set pageSize
    pages.push(itemsCopy.splice(0, pageSize));
  }

  // Move the first page out of pagination. This is so page one doesn't require a page number.
  const firstPage = pages.shift();

  const routes = [
    {
      ...route,
      ...decorate(firstPage, parent, {
        totalPages: pages.length,
        currentPage: 1
      })
    },
    // map over each page to create an array of page routes, and spread it!
    ...pages.map((pageItems, i) => ({
      ...route, // route defaults
      path: `${route.path}/${pageToken}/${i + 2}`,
      ...decorate(pageItems, parent, {
        totalPages: pages.length,
        currentPage: i + 2
      })
    }))
  ];

  return routes;
};

export const makeAuthorRoutes = (authors, posts) => {
  const routes = authors.map(author => {
    const authorPosts = posts.filter(p => {
      const postAuthor = isArray(p.authors)
        ? p.authors.filter(pa => pa.id === author.id)[0]
        : p.authors;
      return postAuthor && postAuthor.id === author.id;
    });

    return paginateItems({
      items: authorPosts,
      parent: author,
      pageSize: 50,
      route: {
        path: `/author/${author.slug}`,
        component: 'src/App/pages/Author'
      },
      decorate: (posts, author, paginator) => ({
        getData: () => ({
          themePrimaryColor: author.themePrimaryColor || SITE_PRIMARY_COLOR,
          currentPage: 'author',
          author,
          posts,
          paginator
        })
      })
    });
  });

  const final = flatten(routes);
  console.log(`Processed ${final.length} Author routes`);
  return final;
};

const makeCategoryRoutes = (categories, posts) => {
  const routes = categories.map(category => {
    const categoryPosts = posts.filter(p => {
      const postCategory = isArray(p.categories)
        ? p.categories.filter(pc => pc.id === category.id)[0]
        : p.categories;
      return postCategory && postCategory.id === category.id;
    });

    return paginateItems({
      items: categoryPosts,
      parent: category,
      pageSize: 50,
      route: {
        path: `/category/${category.slug}`,
        component: 'src/App/pages/Category'
      },
      decorate: (posts, category, paginator) => ({
        getData: () => ({
          themePrimaryColor: category.themePrimaryColor || SITE_PRIMARY_COLOR,
          currentPage: 'category',
          category,
          posts,
          paginator
        })
      })
    });
  });

  const final = flatten(routes);
  console.log(`Processed ${final.length} Category routes`);
  return final;
};

export const makePostRoutes = (posts, furtherReadingUnit) => {
  const routes = posts.map(post => {
    const getPostRoute = category => ({
      path: `/${category.slug}/${post.slug}`,
      component: 'src/App/pages/Post',
      getData: () => ({
        themePrimaryColor: post.themePrimaryColor || POST_PRIMARY_COLOR,
        currentPage: 'post',
        furtherReadingUnit,
        post
      })
    });

    if (isArray(post.categories)) {
      return post.categories.map(getPostRoute);
    }
    return getPostRoute(post.categories);
  });

  const final = flatten(routes);
  console.log(`Processed ${final.length} Post routes`);
  return final;
};

export const organizeContentByType = (content, models) => {
  const organized = {};
  models.forEach(model => {
    organized[model.apiKey] = [];
  });
  content.forEach(item => {
    const modelName = item.meta.contentType.name;
    organized[modelName].push(item);
  });
  return organized;
};
