
var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");

/**
 * This is used as the display text for the build phase block in XCode as well as the
 * inline comments inside of the .pbxproj file for the build script phase block.
 */
var comment = "\"Bugly\"";

module.exports = {

    addBuglyStart: function(context) {
      var appDelegate = utilities.readAppDelegate(context);
      appDelegate = appDelegate.replace('@implementation AppDelegate','#import <Bugly/Bugly.h>\n@implementation AppDelegate');
      appDelegate = appDelegate.replace('self.viewController','[Bugly startWithAppId:nil];\n    self.viewController');
      utilities.writeAppDelegate(context, appDelegate);
    },
    removeBuglyStart: function(context) {
      var appDelegate = utilities.readAppDelegate(context);
      appDelegate = appDelegate.replace(/\#import <Bugly\/Bugly\.h>\s/m, '');
      appDelegate = appDelegate.replace(/\[Bugly startWithAppId:nil];\s+/, '');
      utilities.writeAppDelegate(context, appDelegate);
    }

};
