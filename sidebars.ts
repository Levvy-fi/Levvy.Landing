import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '👼 Welcome',
    },
    {
      type: 'category',
      label: '📜 Angel Paper',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Angel Finance Documentation',
        description: 'Complete documentation for Angel Finance and Levvy platform',
        keywords: ['angel finance', 'documentation', 'cardano', 'defi'],
      },
      items: [
        'angel-paper/disclaimer',
        'angel-paper/introduction',
        'angel-paper/project-goals',
        'angel-paper/tokenomics',
        'angel-paper/ada-distribution',
      ],
    },
    {
      type: 'category',
      label: '🏦 Levvy Finance',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Levvy Finance Platform',
        description: 'Learn about peer-to-peer lending on Cardano',
        keywords: ['levvy', 'lending', 'borrowing', 'defi'],
      },
      items: [
        'angel-paper/levvy/what-is-levvy',
        'angel-paper/levvy/why-levvy',
        'angel-paper/levvy/how-it-works',
        'angel-paper/levvy/borrowing',
        'angel-paper/levvy/lending',
        'angel-paper/levvy/fees',
        'angel-paper/levvy/statistics',
        'angel-paper/levvy/v3-roadmap',
      ],
    },
    {
      type: 'category',
      label: '👥 Team & Partners',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Meet the Team',
        description: 'Learn about the people and partners behind Angel Finance',
        keywords: ['team', 'partners', 'SAIB', 'developers'],
      },
      items: [
        'angel-paper/team/saib',
        'angel-paper/team/the-team',
      ],
    },
    {
      type: 'category',
      label: '📚 Resources',
      collapsed: true,
      items: [
        'angel-paper/links',
        'angel-paper/legal-notice',
      ],
    },
  ],
};

export default sidebars;