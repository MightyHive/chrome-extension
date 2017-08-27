export default {
  // Can be extended to offer a variety of metadata, such as
  // tracker homepages, descriptions, ect.
  trackerData: {
    ga_audiences: {
      displayName: 'GA Audiences',
    },
    google_analytics: {
      displayName: 'Google Analytics',
    },
    adobe_analytics: {
      displayName: 'Adobe Analytics',
    },
    doubleclick: {
      displayName: 'DoubleClick',
    },
  },
  /**
   * Trackers matching is organized by domain name. This is done for efficiency,
   * to ensure every network call doesn't need to be examined by every single pattern
   * for every single host.
   *
   * However, some trackers, such as DoubleClick, actually share their domain name
   * with other trackers. Thus, it becomes neccessary to separate them by subdomains.
   * Tracker matching is done with the Minimatch library.
   * See here for docs: https://www.npmjs.com/package/minimatch
   *
   * 'google.com': [ // NOTE: Categorize trackers under their domain name
   *   {
   *     trackerId: 'ga_audiences', // A single tracker ID that is under "trackerData".
   *     matches: [ // A list of matches with this TrackerId.
           // Note the "**" used here. This allows any subdomain to be used.
           // Query strings are stripped out of request comparison, so you don't
           // need to account for them.
   *       '**google.com/ads/ga-audiences',
   *     ],
   *   },
   * ]
   */
  trackers: {
    'google.com': [
      {
        trackerId: 'ga_audiences',
        matches: [
          '**google.com/ads/ga-audiences',
        ],
      },
    ],
    'google-analytics.com': [
      {
        trackerId: 'google_analytics',
        matches: [
          '**google-analytics.com/collect',
          '**google-analytics.com/*.js',
        ],
      },
    ],
    '2o7.net': [
      {
        trackerId: 'adobe_analytics',
        matches: [
          '**2o7.net/**',
        ],
      },
    ],
    'doubleclick.net': [
      {
        trackerId: 'doubleclick',
        matches: [
          '**doubleclick.net/r/collect',
          '**doubleclick.net/*.js',
          '**doubleclick.net/*.gif',
        ],
      },
    ],
  },
};

