const path = require("path");

module.exports = {
  pages: {
    options: {
      template: "public/browser-extension.html",
      entry: "./src/options/main.ts",
      title: "Interceptor",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background/index.ts",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.join(__dirname, "/src"),
      },
    },
  },
};
