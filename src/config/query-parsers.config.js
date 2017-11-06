export default {
  parsers: {
    'doubleclick.net': [
      {
        pattern: '**ad.doubleclick.net/ddm/clk/**',
        parser: (path) => {
          const result = {};
          const pattern = /;([a-z])\?(.+)/;
          const [, query, value] = pattern.exec(path);

          result[query] = value;
          return result;
        },
      },
      {
        pattern: '**fls.doubleclick.net/activity**',
        parser: (path) => {
          const result = {};
          const keyValue = path.split(';').splice(1);

          keyValue.forEach((pair) => {
            const [key, value] = pair.split('=');

            result[key] = value;
          });

          return result;
        },
      },
    ],
  },
};
