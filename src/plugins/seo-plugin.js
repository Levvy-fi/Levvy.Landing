module.exports = function seoPlugin() {
  return {
    name: 'custom-seo-plugin',
    
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              property: 'og:site_name',
              content: 'Angel Finance',
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'twitter:site',
              content: '@angelcoinada',
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'twitter:creator',
              content: '@angelcoinada',
            },
          },
        ],
      };
    },
  };
};