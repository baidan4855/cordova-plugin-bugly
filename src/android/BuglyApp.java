package com.ihealthlabs.plugins;

import android.app.Application;
import com.tencent.bugly.crashreport.CrashReport;

public class BuglyApp extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    System.out.println("Bugly running.......");
    CrashReport.initCrashReport(getApplicationContext());
  }
}
