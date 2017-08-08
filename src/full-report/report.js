import * as queryString from 'query-string';

import * as util from '../popup/utils';

const parsedQuery = queryString.parse(window.location.search);

// Pull tab data from Background
util.getTabData(parsedQuery.id).then((data) => {
  // tab = data;
  console.log(data);
  // renderApp();
});
