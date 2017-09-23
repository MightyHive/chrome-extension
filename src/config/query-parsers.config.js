export default {
  parsers: {
    'doubleclick.net': [
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
