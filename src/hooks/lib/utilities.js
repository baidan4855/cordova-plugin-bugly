
/**
 * Utilities and shared functionality for the build hooks.
 */

var path = require("path");
var fs = require("fs");

/**
 * Used to get the path to the AndroidManifest.xml file for the Android project.
 *
 * @returns {string} The path to the AndroidManifest.xml file.
 */
function getManifestPath() {
    return path.join("platforms", "android", "AndroidManifest.xml");
}

module.exports = {

    /**
     * Used to get the name of the application as defined in the config.xml.
     *
     * @param {object} context - The Cordova context.
     * @returns {string} The value of the name element in config.xml.
     */
    getAppName: function(context) {
        var ConfigParser = context.requireCordovaModule("cordova-lib").configparser;
        var config = new ConfigParser("config.xml");
        return config.name();
    },
    getAppDelegatePath: function(context) {
      var appName = this.getAppName(context);
      return path.join("platforms", "ios", appName, "Classes", "AppDelegate.m");
    },
    readAppDelegate: function(context) {
        return fs.readFileSync(this.getAppDelegatePath(context), "utf-8");
    },
    writeAppDelegate: function(context, appDelegate) {
        fs.writeFileSync(this.getAppDelegatePath(context), appDelegate);
    },
    /**
     * The ID of the plugin; this should match the ID in plugin.xml.
     */
    getPluginId: function () {
        return "cordova-plugin-bugly";
    },

    /**
     * Used to get the plugin configuration for the given platform.
     *
     * The plugin configuration object will have the APPID
     * for the Bugly service that were specified when the plugin
     * was installed.
     *
     * This configuration is obtained from, where "ios" is the platform name:
     *    platforms/ios/ios.json
     *
     * @param {string} platform - The platform to get plugin configuration for, either "ios" or "android".
     * @returns {string} The path to the platform's plugin JSON configuration file.
     */
    getPluginConfig: function(platform) {
        var platformConfigPath = path.join("platforms", platform, platform + ".json");
        var platformConfig = require(process.cwd() + "/" + platformConfigPath);
        var pluginId = this.getPluginId();
        var appIdKeys = {android: "BUGLY_APPID_ANDROID", ios: "BUGLY_APPID_IOS"};
        var id = platformConfig.installed_plugins[pluginId][appIdKeys[platform]];
        var debug = platformConfig.installed_plugins[pluginId].BUGLY_ENABLE_DEBUG;
        var config = {
            id: id,
            debug: debug
        }
        return config;
    },

    readManifest: function() {
        return fs.readFileSync(getManifestPath(), "utf-8");
    },

    writeManifest: function(manifest) {
        fs.writeFileSync(getManifestPath(), manifest);
    }
};
