// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.ihealthlabs.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.app.Application;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.tencent.bugly.Bugly;

import java.util.List;

public class BuglyPlugin extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        
        Log.i("bugly", "Bugly running.......");
    
        try {
            Application application = cordova.getActivity().getApplication();
            
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = applicationInfo.metaData;
            String buglyAppId = bundle.getString("BUGLY_APPID");
            Boolean bugylyDebug = bundle.getBoolean("BUGLY_ENABLE_DEBUG");
            Bugly.init(application.getApplicationContext(), buglyAppId, bugylyDebug);
        } catch (PackageManager.NameNotFoundException e) {
            Log.e("bugly", "Failed to load meta-data, NameNotFound: " + e.getMessage());
        }
    }
}
