const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

module.exports = {
  // your existing webpack configuration...

  plugins: [
    new StatsPlugin({
      stats: {
        all: false,
        errors: true,
        warnings: true,
        assets: true,
      },
    }),
  ],
};
