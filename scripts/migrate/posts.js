const axios = require('axios');
const { SiteClient } = require('datocms-client');

const datocmsClient = new SiteClient('0ef9d273001e4484d53bec08550899');

const wp_posts = {
  getPostEndpoint: () => 'http://jewishcurrents.org/wp-json/wp/v2/posts',

  getTag: id =>
    axios.get('http://jewishcurrents.org/wp-json/wp/v2/posts', {
      params: {
        include: id
      }
    }),

  getAllTags: (uri, tags) =>
    axios
      .get(uri, {
        params: {
          per_page: 100,
          hide_empty: true
        },
        timeout: 5000
      })
      .then(response => {
        if (!tags) tags = [];

        tags = tags.concat(response.data);
        console.log(`${tags.length} so far`);
        if (response.headers.link.split(',').filter(link => link.match(/rel="next"/)).length > 0) {
          console.log('There are more...');
          const next = new RegExp(/<(.*)>/).exec(
            response.headers.link.split(',').filter(link => link.match(/rel="next"/))[0]
          )[1];
          return wp_posts.getAllTags(next, tags);
        }
        return tags;
      })
      .catch(console.log),

  saveTagsToDatoCMS: tags => {
    const tagPromises = tags.map(tag =>
      datocmsClient.items
        .create({
          itemType: '28163',
          title: tag.name,
          slug: tag.slug,
          description: tag.description
        })
        .catch(err => {
          console.log(err);
        })
    );
    console.log(tagPromises);
    console.log(tagPromises.length);
    return Promise.all(tagPromises);
  },

  writeTagsToFile: tags => {
    const tagMap = {};
    tags.forEach(tag => {
      tagMap[tag.id] = { dato: { id: tag.id, slug: tag.slug } };
    });
    const tagMapJSON = JSON.stringify(tagMap);
    console.log(tagMapJSON);
    return tagMap;
  }
};

const main = () =>
  wp_posts
    .getAllTags('http://jewishcurrents.org/wp-json/wp/v2/tags')
    .then(wp_posts.saveTagsToDatoCMS);

main().then(console.log);
