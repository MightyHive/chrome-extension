export default {
  layers: [
    {
      id: 'gtm',
      displayName: 'Google Tag Manager (GTM)',
      type: 'windowProperty',
      key: 'dataLayer',
    },
    {
      id: 'tealium',
      displayName: 'Tealium',
      type: 'windowProperty',
      key: 'utag_data',
    },
    {
      id: 'dtm',
      displayName: 'Adobe Dynamic Tag Management',
      type: 'windowProperty',
      key: 'placeholderKey',
    },
  ],
};
