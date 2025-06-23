import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { config as loadEnv } from 'dotenv';

// Load environment variables from .env file
loadEnv();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Angel Finance • Official Website',
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
          editUrl: 'https://github.com/Levvy-fi/Levvy.Landing/tree/main/',
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
    navbar: {
      title: '',
      logo: {
        alt: 'Angel Finance Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/Levvy-fi/Levvy.Landing',
          label: 'GitHub',
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
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/your-discord',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/your-twitter',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Levvy-fi/Levvy.Landing',
            },
            {
              label: 'Angel Paper',
              href: 'https://ccardano.gitbook.io/angel-paper',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Angel Finance. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
