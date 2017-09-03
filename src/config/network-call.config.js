export default {
  // Can be extended to offer a variety of metadata, such as
  // tracker homepages, descriptions, ect.
  trackerData: {
    adobe_analytics: {
      displayName: 'Adobe Analytics',
    },
    adelphic: {
      displayName: 'Adelphic',
    },
    adroll: {
      displayName: 'AdRoll',
    },
    amazon: {
      displayName: 'Amazon',
    },
    brightroll: {
      displayName: 'BrightRoll (Yahoo)',
    },
    crimtan: {
      displayName: 'CrimTan',
    },
    doubleclick: {
      displayName: 'DoubleClick',
    },
    ga_audiences: {
      displayName: 'GA Audiences',
    },
    google_analytics: {
      displayName: 'Google Analytics',
    },
    krux: {
      displayName: 'Krux',
    },
    pinsight: {
      displayName: 'Pinsight',
    },
    rocketfuel: {
      displayName: 'RocketFuel',
    },
    the_trade_desk: {
      displayName: 'The Trade Desk',
    },
    twitter: {
      displayName: 'Twitter',
    },
    facebook: {
      displayName: 'Facebook',
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
    '0b1011.net': [
      {
        trackerId: 'pinsight',
        matches: [
          'f11e.0b1011.net/**',
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
    'adroll.com': [
      {
        trackerId: 'adroll',
        matches: [
          's.adroll.com/**',
          'a.adroll.com/**',
        ],
      },
    ],
    'adsrvr.org': [
      {
        trackerId: 'the_trade_desk',
        matches: [
          'insight.adsrvr.org/**',
        ],
      },
    ],
    'ads-twitter.com': [
      {
        trackerId: 'twitter',
        matches: [
          '**ads-twitter.com/**',
        ],
      },
    ],
    'amazon-adsystem.com': [
      {
        trackerId: 'amazon',
        matches: [
          '**amazon-adsystem.com/**',
        ],
      },
    ],
    'ctnsnet.com': [
      {
        trackerId: 'crimtan',
        matches: [
          'ipac.ctnsnet.com/**',
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
          '**fls.doubleclick.net/**',
        ],
      },
    ],
    'facebook.com': [
      {
        trackerId: 'facebook',
        matches: [
          '**facebook.com/tr',
        ],
      },
    ],
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
    'ipredictive.com': [
      {
        trackerId: 'adelphic',
        matches: [
          'ad.ipredictive.com/**',
        ],
      },
    ],
    'krxd.net': [
      {
        trackerId: 'krux',
        matches: [
          '**krxd.net/**',
        ],
      },
    ],
    'rfihub.com': [
      {
        trackerId: 'rocketfuel',
        matches: [
          '**rfihub.com/**',
        ],
      },
    ],
    'yahoo.com': [
      {
        trackerId: 'brightroll',
        matches: [
          'sp.analytics.yahoo.com/**',
        ],
      },
    ],
  },
};

