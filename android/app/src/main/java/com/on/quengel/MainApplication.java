package com.on.quengel;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD:android/app/src/main/java/com/on/quengel/MainApplication.java
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
=======
import com.lwansbrough.RCTCamera.RCTCameraPackage;
>>>>>>> 208e2938abb06f3ab6ff21a6275b062dcdf0a42f:android/app/src/main/java/com/on/quengel/MainApplication.java
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new SvgPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
