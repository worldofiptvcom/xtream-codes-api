import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Xtream Codes API',
  tagline: 'Complete API Documentation for Xtream Codes IPTV Panel v2.9.2',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://worldofiptvcom.github.io',
  baseUrl: '/xtream-codes-api/',
  trailingSlash: false,

  organizationName: 'worldofiptvcom',
  projectName: 'xtream-codes-api',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
          routeBasePath: '/',
          editUrl: 'https://github.com/worldofiptvcom/xtream-codes-api/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Xtream Codes API',
      logo: {
        alt: 'Xtream Codes API Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          to: '/swagger',
          label: 'API Explorer',
          position: 'left',
        },
        {
          to: '/openapi',
          label: 'OpenAPI Spec',
          position: 'left',
        },
        {
          href: 'https://github.com/worldofiptvcom/xtream-codes-api',
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
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Player API',
              to: '/category/player-api',
            },
            {
              label: 'Streaming',
              to: '/category/streaming',
            },
          ],
        },
        {
          title: 'API Categories',
          items: [
            {
              label: 'Admin API',
              to: '/category/admin-api',
            },
            {
              label: 'MAG Portal',
              to: '/category/mag-portal',
            },
            {
              label: 'Enigma2 API',
              to: '/category/enigma2-api',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'OpenAPI Specification',
              to: '/openapi',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/worldofiptvcom/xtream-codes-api',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Xtream Codes API Documentation. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'php', 'python', 'javascript', 'markup'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
