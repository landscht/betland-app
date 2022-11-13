const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      // electron-builder config
      builderOptions: {
        productName: "App",
        copyright: "© 2021 App Dev",

        // specific to castlabs fork (for widevine cdm)
        electronVersion: "18.0.3-wvvmp",
        electronDownload: {
          mirror: "https://github.com/castlabs/electron-releases/releases/download/v"
        },

        afterPack: "./build/afterPack.js",
        afterSign: "./build/afterSign.js",
      }
    }
  }
})
