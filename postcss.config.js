module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('postcss-calc'),
    require('postcss-image-set-polyfill'),
    require('postcss-nesting'),
    require('postcss-custom-media')({
      extensions: {
        '--g-medium-viewport': '(min-width: 475px)',
        '--g-large-viewport': '(min-width: 768px)',
        '--g-xlarge-viewport': '(min-width: 1024px)'
      }
    }),
    require('postcss-media-minmax'),
    require('postcss-color-function'),
    require('postcss-font-family-system-ui'),
    require('postcss-property-lookup'),
    require('postcss-selector-matches'),
    require('postcss-selector-not'),
    require('postcss-pseudo-class-any-link'),
    require('postcss-object-fit-images'),
    require('rucksack-css'),
    require('autoprefixer')
  ]
};
