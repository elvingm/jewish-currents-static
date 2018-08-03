const { SiteClient, Loader } = require('datocms-client');

const client = new SiteClient('0ef9d273001e4484d53bec08550899');
const loader = new Loader(client);

const getData = async () => {
  await loader.load();
  console.log(loader);
  console.log(loader.itemsRepo);
};

getData();

// Dato Models
// [ { id: '26697',
//   name: 'Author',
//   singleton: false,
//   sortable: false,
//   apiKey: 'author',
//   orderingDirection: null,
//   tree: false,
//   modularBlock: false,
//   fields: [ '99491', '103435', '103436', '103438' ],
//   singletonItem: null,
//   orderingField: null },
// { id: '26694',
//   name: 'Post',
//   singleton: false,
//   sortable: false,
//   apiKey: 'post',
//   orderingDirection: null,
//   tree: false,
//   modularBlock: false,
//   fields:
//    [ '103431',
//      '103433',
//      '103432',
//      '103434',
//      '103439',
//      '103440',
//      '103441' ],
//   singletonItem: null,
//   orderingField: null },
// { id: '26696',
//   name: 'Tag',
//   singleton: false,
//   sortable: false,
//   apiKey: 'tag',
//   orderingDirection: null,
//   tree: false,
//   modularBlock: false,
//   fields: [ '99490', '103429', '103430' ],
//   singletonItem: null,
//   orderingField: null },
// { id: '26695',
//   name: 'Vertical',
//   singleton: false,
//   sortable: false,
//   apiKey: 'vertical',
//   orderingDirection: 'asc',
//   tree: false,
//   modularBlock: false,
//   fields: [ '99489' ],
//   singletonItem: null,
//   orderingField: '99489' } ]
