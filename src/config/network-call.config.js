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
        '/*',
      ],
    },
    'google-analytics.com': {
      trackerId: 'google_analytics',
      endpoints: [
        '/ads/ga-audiences',
      ],
    },
    '2o7.net': {
      trackerId: 'adobe_analytics',
      endpoints: [
        '/*',
      ],
    },
  },
};

