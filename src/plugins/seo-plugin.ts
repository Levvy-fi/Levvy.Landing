import type { Plugin } from '@docusaurus/types';

export default function seoPlugin(): Plugin {
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
}