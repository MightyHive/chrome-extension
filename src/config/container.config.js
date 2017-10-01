export default {
  /**
   * For more information on configuration syntax, see the Network Call config,
   * which is set up in a very similar manner.
   */
  containers: {
    'googletagmanager.com': [
      {
        matches: [
          '**googletagmanager.com/gtm.js',
        ],
        parser: () => (
          {
            displayName: networkCall.parsedUrl.query.id,
          }
        ),
      },
    ],
    'tiqcdn.com': [
      {
        matches: [
          '**tags.tiqcdn.com/utag/**',
        ],
        parser: (networkCall) => {
          const { host, path } = networkCall.parsedUrl;
          const pathedHost = host + path; // No protocall
          const [account, profile, environment, filename] =
              pathedHost.replace('tags.tiqcdn.com/utag/', '').split('/');
          const splitFilename = filename.split('.');
          let version = 'None. utag.js';

          if (splitFilename.length > 2) {
            version = splitFilename[1];
          }

          return {
            displayName: 'Tealium Tag',
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

