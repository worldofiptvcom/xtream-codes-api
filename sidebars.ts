import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'authentication',
      label: 'Authentication',
    },
    {
      type: 'doc',
      id: 'error-codes',
      label: 'Error Codes',
    },
    {
      type: 'category',
      label: 'Player API',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'player-api/overview',
      },
      items: [
        'player-api/user-info',
        'player-api/live-categories',
        'player-api/live-streams',
        'player-api/vod-categories',
        'player-api/vod-streams',
        'player-api/vod-info',
        'player-api/series-categories',
        'player-api/series',
        'player-api/series-info',
        'player-api/epg',
      ],
    },
    {
      type: 'category',
      label: 'Panel API',
      link: {
        type: 'doc',
        id: 'panel-api/overview',
      },
      items: [
        'panel-api/full-data',
        'panel-api/get-epg',
      ],
    },
    {
      type: 'category',
      label: 'Admin API',
      link: {
        type: 'doc',
        id: 'admin-api/overview',
      },
      items: [
        'admin-api/server-management',
        'admin-api/stream-management',
        'admin-api/user-management',
        'admin-api/stb-management',
        'admin-api/reseller-management',
      ],
    },
    {
      type: 'category',
      label: 'MAG Portal',
      link: {
        type: 'doc',
        id: 'mag-portal/overview',
      },
      items: [
        'mag-portal/authentication',
        'mag-portal/stb-actions',
        'mag-portal/itv-actions',
        'mag-portal/vod-actions',
        'mag-portal/series-actions',
        'mag-portal/watchdog',
      ],
    },
    {
      type: 'category',
      label: 'Enigma2 API',
      link: {
        type: 'doc',
        id: 'enigma2-api/overview',
      },
      items: [
        'enigma2-api/live-bouquets',
        'enigma2-api/vod-bouquets',
      ],
    },
    {
      type: 'category',
      label: 'Streaming',
      link: {
        type: 'doc',
        id: 'streaming/overview',
      },
      items: [
        'streaming/live-tv',
        'streaming/vod',
        'streaming/series',
        'streaming/timeshift',
      ],
    },
    {
      type: 'category',
      label: 'Utilities',
      link: {
        type: 'generated-index',
        title: 'Utility Endpoints',
        description: 'Additional utility endpoints for EPG and playlist generation.',
      },
      items: [
        'utilities/xmltv',
        'utilities/playlists',
      ],
    },
  ],
};

export default sidebars;
