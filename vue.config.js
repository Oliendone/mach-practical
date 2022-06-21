module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/mach-practical/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/assets/style/styles.sass"`
      },
    }
  }
};
