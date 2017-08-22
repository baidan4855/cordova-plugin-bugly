package com.ihealthlabs.plugins;

import android.app.Application;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;

import com.tencent.bugly.Bugly;


public class BuglyApp extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    System.out.println("Bugly running.......");

    try {

        ApplicationInfo applicationInfo = getPackageManager().getApplicationInfo(this.getPackageName(), PackageManager.GET_META_DATA);
        Bundle bundle = applicationInfo.metaData;
        String buglyAppId = bundle.getString("BUGLY_APPID");
        Boolean bugylyDebug = bundle.getBoolean("BUGLY_ENABLE_DEBUG");
        Bugly.init(getApplicationContext(), buglyAppId, );
    } catch (PackageManager.NameNotFoundException e) {
        Log.e("bugly", "Failed to load meta-data, NameNotFound: " + e.getMessage());
    }
  }
}
