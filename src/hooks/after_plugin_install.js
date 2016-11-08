
var androidHelper = require('./lib/android-helper');
var iosHelper = require("./lib/ios-helper");
var utilities = require("./lib/utilities");

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    if (platforms.indexOf("android") !== -1) {
      console.log('Tip: AndroidManifest.xml has been changed automatically!!')
      androidHelper.setAppName();
    }

    if (platforms.indexOf("ios") !== -1) {
      console.log('Tip: AppDelegate.m has been changed automatically!!')
      iosHelper.addBuglyStart(context);
    }
};
