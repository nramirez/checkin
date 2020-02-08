const nib = require('nib');
const withStylus = require('@zeit/next-stylus');

module.exports = withStylus({
  stylusLoaderOptions: {
    use: [nib()]
  }
})