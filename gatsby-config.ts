import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `angels`,
    siteUrl: `https://www.yourdomain.tld`
  },
  pathPrefix: `/angel-landing`,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", 
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
    resolve: 'gatsby-plugin-google-fonts',
    options: {
      fonts: [
        "Albert Sans:100,200,300,400,500,600,700,800,900:latin,latin-ext",
        "Cinzel:100,200,300,400,500,600,700,800,900:latin,latin-ext"
      ],
      display: "swap",
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "Angel Finance",
      short_name: "Angels",
      start_url: "/",
      display: "standalone",
      icon: "src/images/angels_logo.svg",
      crossOrigin: `use-credentials`,
    },
  }
]
};

export default config;
