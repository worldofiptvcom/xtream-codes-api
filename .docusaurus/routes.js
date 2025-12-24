import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/xtream-codes-api/markdown-page',
    component: ComponentCreator('/xtream-codes-api/markdown-page', '888'),
    exact: true
  },
  {
    path: '/xtream-codes-api/search',
    component: ComponentCreator('/xtream-codes-api/search', '04a'),
    exact: true
  },
  {
    path: '/xtream-codes-api/',
    component: ComponentCreator('/xtream-codes-api/', 'ab5'),
    exact: true
  },
  {
    path: '/xtream-codes-api/',
    component: ComponentCreator('/xtream-codes-api/', '286'),
    routes: [
      {
        path: '/xtream-codes-api/',
        component: ComponentCreator('/xtream-codes-api/', '2d8'),
        routes: [
          {
            path: '/xtream-codes-api/',
            component: ComponentCreator('/xtream-codes-api/', '06f'),
            routes: [
              {
                path: '/xtream-codes-api/admin-api/overview',
                component: ComponentCreator('/xtream-codes-api/admin-api/overview', '88c'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/admin-api/reseller-management',
                component: ComponentCreator('/xtream-codes-api/admin-api/reseller-management', '099'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/admin-api/server-management',
                component: ComponentCreator('/xtream-codes-api/admin-api/server-management', '788'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/admin-api/stb-management',
                component: ComponentCreator('/xtream-codes-api/admin-api/stb-management', '5bb'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/admin-api/stream-management',
                component: ComponentCreator('/xtream-codes-api/admin-api/stream-management', 'b22'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/admin-api/user-management',
                component: ComponentCreator('/xtream-codes-api/admin-api/user-management', 'b23'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/authentication',
                component: ComponentCreator('/xtream-codes-api/authentication', 'd59'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/category/utilities',
                component: ComponentCreator('/xtream-codes-api/category/utilities', '287'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/enigma2-api/live-bouquets',
                component: ComponentCreator('/xtream-codes-api/enigma2-api/live-bouquets', 'd20'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/enigma2-api/overview',
                component: ComponentCreator('/xtream-codes-api/enigma2-api/overview', '913'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/enigma2-api/vod-bouquets',
                component: ComponentCreator('/xtream-codes-api/enigma2-api/vod-bouquets', '3f4'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/error-codes',
                component: ComponentCreator('/xtream-codes-api/error-codes', '931'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/authentication',
                component: ComponentCreator('/xtream-codes-api/mag-portal/authentication', 'f7a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/itv-actions',
                component: ComponentCreator('/xtream-codes-api/mag-portal/itv-actions', '398'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/overview',
                component: ComponentCreator('/xtream-codes-api/mag-portal/overview', '87f'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/series-actions',
                component: ComponentCreator('/xtream-codes-api/mag-portal/series-actions', 'fda'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/stb-actions',
                component: ComponentCreator('/xtream-codes-api/mag-portal/stb-actions', '8b8'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/vod-actions',
                component: ComponentCreator('/xtream-codes-api/mag-portal/vod-actions', 'c6e'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/mag-portal/watchdog',
                component: ComponentCreator('/xtream-codes-api/mag-portal/watchdog', '8d8'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/openapi',
                component: ComponentCreator('/xtream-codes-api/openapi', 'a7a'),
                exact: true
              },
              {
                path: '/xtream-codes-api/panel-api/full-data',
                component: ComponentCreator('/xtream-codes-api/panel-api/full-data', 'b48'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/panel-api/get-epg',
                component: ComponentCreator('/xtream-codes-api/panel-api/get-epg', '229'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/panel-api/overview',
                component: ComponentCreator('/xtream-codes-api/panel-api/overview', '41a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/epg',
                component: ComponentCreator('/xtream-codes-api/player-api/epg', '664'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/live-categories',
                component: ComponentCreator('/xtream-codes-api/player-api/live-categories', '29f'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/live-streams',
                component: ComponentCreator('/xtream-codes-api/player-api/live-streams', '72b'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/overview',
                component: ComponentCreator('/xtream-codes-api/player-api/overview', '367'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/series',
                component: ComponentCreator('/xtream-codes-api/player-api/series', 'b8e'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/series-categories',
                component: ComponentCreator('/xtream-codes-api/player-api/series-categories', 'a87'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/series-info',
                component: ComponentCreator('/xtream-codes-api/player-api/series-info', '349'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/user-info',
                component: ComponentCreator('/xtream-codes-api/player-api/user-info', '432'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/vod-categories',
                component: ComponentCreator('/xtream-codes-api/player-api/vod-categories', '9e7'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/vod-info',
                component: ComponentCreator('/xtream-codes-api/player-api/vod-info', 'd84'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/player-api/vod-streams',
                component: ComponentCreator('/xtream-codes-api/player-api/vod-streams', '737'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/streaming/live-tv',
                component: ComponentCreator('/xtream-codes-api/streaming/live-tv', 'aea'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/streaming/overview',
                component: ComponentCreator('/xtream-codes-api/streaming/overview', 'adb'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/streaming/series',
                component: ComponentCreator('/xtream-codes-api/streaming/series', '625'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/streaming/timeshift',
                component: ComponentCreator('/xtream-codes-api/streaming/timeshift', '648'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/streaming/vod',
                component: ComponentCreator('/xtream-codes-api/streaming/vod', 'a6d'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/utilities/playlists',
                component: ComponentCreator('/xtream-codes-api/utilities/playlists', 'ec8'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/utilities/xmltv',
                component: ComponentCreator('/xtream-codes-api/utilities/xmltv', '3f0'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/xtream-codes-api/',
                component: ComponentCreator('/xtream-codes-api/', '645'),
                exact: true,
                sidebar: "apiSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
