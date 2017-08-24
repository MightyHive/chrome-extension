// Separated into two properties, to account for trackers
// that use multiple hostnames.
//
// Note that subdomains need to be factored out of the equation.
// This is because enterprise-scale companies are often given
// custom subdomain endpoints.
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
  // NOTE: Endpoints are compared using URL matching,
  // thus you can use wildcards to capture calls.
  //
  // For instance:
  // '/*' would match '/analytics.js'
  trackers: {
    'google.com': {
      trackerId: 'ga_audiences',
      endpoints: [
        '/ads/ga-audiences',
      ],
    },
    'google-analytics.com': {
      trackerId: 'google_analytics',
      endpoints: [
        '/collect',
        '/*.js',
      ],
    },
    '2o7.net': {
      trackerId: 'adobe_analytics',
      endpoints: [
        '/*',
      ],
    },
    'doubleclick.net': {
      trackerId: 'doubleclick',
      endpoints: [
        '/r/collect',
        '/*.js',
        '/*.gif',
      ],
    },
  },
};

