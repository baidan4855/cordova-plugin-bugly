var iosHelper = require("./lib/ios-helper");
var utilities = require("./lib/utilities");

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    // Remove the AppDelegate.m modifications that were added when the plugin was installed.
    if (platforms.indexOf("ios") !== -1) {
        console.log("Tip: AppDelegate.m has been restored automatically!!")
        iosHelper.removeBuglyStart(context);
    }
};
