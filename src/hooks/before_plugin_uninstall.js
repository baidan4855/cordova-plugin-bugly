
var androidHelper = require('./lib/android-helper');
var iosHelper = require("./lib/ios-helper");
var utilities = require("./lib/utilities");

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    // Remove the AndroidManifest.xml modifications that were added when the plugin was installed.
    if (platforms.indexOf("android") !== -1) {
        console.log("Tip: AndroidManifest.xml has been restored automatically!!")
        androidHelper.removeAppName();
    }

    // Remove the AppDelegate.m modifications that were added when the plugin was installed.
    if (platforms.indexOf("ios") !== -1) {
        console.log("Tip: AppDelegate.m has been restored automatically!!")
        iosHelper.removeBuglyStart(context);
    }
};
