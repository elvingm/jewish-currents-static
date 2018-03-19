const fs = require('fs');
const axios = require('axios');
const { SiteClient } = require('datocms-client');

const datocmsClient = new SiteClient('0ef9d273001e4484d53bec08550899');

const wp_tags = {
  getTagURL: () => 'http://jewishcurrents.org/wp-json/wp/v2/tags',

  getTag: id =>
    axios.get('http://jewishcurrents.org/wp-json/wp/v2/tags', {
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
          return wp_tags.getAllTags(next, tags);
        }
        return tags;
      })
      .catch(console.log),

  saveTagsToDatoCMS: tags => {
    const records = [];
    const tagPromises = tags.map(tag =>
      datocmsClient.items
        .create({
          itemType: '28163',
          title: tag.name,
          slug: tag.slug,
          description: tag.description
        })
        .then(rec => {
          console.log(rec);
          records.push(rec);
        })
        .catch(err => {
          console.log('------------------error from dato promise-----------------', err);
        })
    );
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
  wp_tags
    .getAllTags('http://jewishcurrents.org/wp-json/wp/v2/tags')
    .then(wp_tags.saveTagsToDatoCMS);

main().then(console.log);
