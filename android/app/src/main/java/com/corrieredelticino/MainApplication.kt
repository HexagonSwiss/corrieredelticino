package com.corrieredelticino

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.iubenda.iab.IubendaCMPConfig
import com.iubenda.iab.IubendaCMP

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              add(IubendaPackager())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }



        // Configurazione CMP avverrà qui
        val config = IubendaCMPConfig.builder()
            .gdprEnabled(true)            // Abilita la conformità al GDPR
            .siteId("3841561")           // ID del tuo sito web (o app)
            .cookiePolicyId("47605511")   // ID della politica dei cookie
            // .googleAds(true)              // Abilita gli annunci Google
            .applyStyles(true)            // Applica gli stili CSS alla CMP
            .build()

            System.out.println("Iubenda CMP initialized")
            System.out.println(config)

        // Inizializzazione della piattaforma CMP
        IubendaCMP.initialize(this, config)
  }

  fun getPackages(): List<ReactPackage> {
    val packages = PackageList(this).packages
    packages.add(IubendaPackager()) // Aggiunge il pacchetto personalizzato
    return packages
  }
}
