import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { config as loadEnv } from 'dotenv';

// Load environment variables from .env file
loadEnv();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Angel Finance',
  titleDelimiter: ' • ',
  tagline: 'Official Angel Finance Website & Documentation',
  favicon: 'img/favicon.svg',

  // Custom fields for environment variables
  customFields: {
    paymentWalletAddress: process.env.PAYMENT_WALLET_ADDRESS,
    blockfrostProjectId: process.env.BLOCKFROST_PROJECT_ID,
    blockfrostNetwork: process.env.BLOCKFROST_NETWORK || 'mainnet',
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://angelfinance.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Levvy-fi', // Usually your GitHub org/user name.
  projectName: 'Levvy.Landing', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    './src/plugins/seo-plugin',
    function () {
      return {
        name: 'custom-webpack-config',
        configureWebpack() {
          return {
            experiments: {
              asyncWebAssembly: true,
              syncWebAssembly: true,
            },
            resolve: {
              fallback: {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                path: require.resolve('path-browserify'),
                vm: require.resolve('vm-browserify'),
                buffer: require.resolve('buffer'),
                fs: false,
                os: false,
                util: false,
                assert: false,
              },
            },
            plugins: [
              new (require('webpack')).ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
              }),
            ],
            module: {
              rules: [
                {
                  test: /\.wasm$/,
                  type: 'webassembly/async',
                },
              ],
            },
          };
        },
      };
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl removed - no edit links
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'images/angelfinance_preview.png',
    metadata: [
      {name: 'description', content: 'Angel Finance brings advanced DeFi to Cardano with lending, borrowing, and yield farming powered by $ANGELS and the Levvy protocol.'},
      {property: 'og:description', content: 'Angel Finance brings advanced DeFi to Cardano with lending, borrowing, and yield farming powered by $ANGELS and the Levvy protocol.'},
      {property: 'og:type', content: 'website'},
      {name: 'twitter:description', content: 'Angel Finance brings advanced DeFi to Cardano with lending, borrowing, and yield farming powered by $ANGELS and the Levvy protocol.'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'levvy_v3_coming',
      content:
        '🚀 <strong>Levvy V3 is coming!</strong> Experience the next generation of lending on Cardano. <a href="/docs/angel-paper/levvy/what-is-levvy">Learn more</a>',
      backgroundColor: '#FFFF7F',
      textColor: '#151412',
      isCloseable: true,
    },
    navbar: {
      title: 'Angel Finance',
      logo: {
        alt: 'Angel Finance Logo',
        src: 'img/angel_token.webp',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://levvy.fi',
          label: 'Levvy App',
          position: 'right',
        },
        {
          href: 'https://discord.gg/angelfinance',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://twitter.com/angelcoinada',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Welcome',
              to: '/docs/intro',
            },
            {
              label: 'Angel Paper',
              to: '/docs/angel-paper/introduction',
            },
            {
              label: 'Levvy Finance',
              to: '/docs/angel-paper/levvy/what-is-levvy',
            },
            {
              label: 'Tokenomics',
              to: '/docs/angel-paper/tokenomics',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/angelfinance',
            },
            {
              label: 'X (Twitter)',
              href: 'https://twitter.com/angelcoinada',
            },
            {
              label: 'Email',
              href: 'mailto:angelfinanceada@protonmail.com',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Levvy App',
              href: 'https://levvy.fi',
            },
            {
              label: 'Original Angel Paper',
              href: 'https://ccardano.gitbook.io/angel-paper',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Angel Finance. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
