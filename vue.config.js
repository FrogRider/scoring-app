module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/globalStyles/main.scss";
        `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/scoring-app/'
    : '/'
};
