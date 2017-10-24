export default {
  // Can be extended to offer a variety of metadata, such as
  // tracker homepages, descriptions, ect.
  containerMeta: {
    tealium: {
      displayName: 'Tealium',
    },
    gtm: {
      displayName: 'Google Tag Manager',
    },
  },
  /**
   * For more information on configuration syntax, see the Network Call config,
   * which is set up in a very similar manner.
   */
  containers: {
    'googletagmanager.com': [
      {
        metaId: 'gtm',
        matches: [
          '**googletagmanager.com/gtm.js',
        ],
        parser: networkCall => networkCall.parsedUrl.query.id,
      },
    ],
    'tiqcdn.com': [
      {
        metaId: 'tealium',
        matches: [
          '**tags.tiqcdn.com/utag/**',
        ],
        parser: (networkCall) => {
          const { host, path } = networkCall.parsedUrl;
          const pathedHost = host + path; // No protocall
          const [account, profile, environment, filename] =
              pathedHost.replace('tags.tiqcdn.com/utag/', '').split('/');
          const splitFilename = filename.split('.');
          let version = 'None';

          if (splitFilename.length > 2) {
            version = splitFilename[1];
          }

          return {
            displayName: version !== 'None' ? `Tealium Tag (${version})` : 'Tealium Tag',
            data: {
              'Tealium Tag Version': version,
              Account: account,
              Profile: profile,
              Environment: environment,
            },
          };
        },
      },
    ],
  },
};

