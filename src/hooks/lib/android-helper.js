
var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");

module.exports = {
  setAppName: function() {
    var manifest = utilities.readBuildGradle();
    manifest = manifest.replace(/(<application[^>]*?) android:name="[^\"]+?"/m,'$1');
    manifest = manifest.replace('<application','<application android:name="com.ihealthlabs.plugins.BuglyApp"');
    utilities.writeBuildGradle(manifest);
  },
  removeAppName: function() {
    var manifest = utilities.readBuildGradle();
    manifest = manifest.replace(/(<application[^>]*?) android:name="[^\"]+?"/m,'$1');
    utilities.writeBuildGradle(manifest);
  }
};
