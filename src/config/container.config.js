export default {
  // Can be extended to offer a variety of metadata, such as
  // container homepages, descriptions, ect.
  containerData: {
    gtm: {
      displayName: 'Google Tag Manager (GTM)',
    },
    tealium: {
      displayName: 'Tealium',
    },
  },
  /**
   * For more information on configuration syntax, see the Network Call config,
   * which is set up in a very similar manner.
   */
  containers: {
    'googletagmanager.com': [
      {
        containerId: 'gtm',
        matches: [
          '**googletagmanager.com/gtm.js',
        ],
      },
    ],
  },
};

