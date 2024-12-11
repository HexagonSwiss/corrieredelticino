package com.corrieredelticino

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.iubenda.iab.IubendaCMP
import com.iubenda.iab.IubendaCMPConfig

class IubendaBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "IubendaBridge"
    }

    @ReactMethod
    fun initialize(configMap: ReadableMap) {
        val context = reactApplicationContext
        val builder = IubendaCMPConfig.builder()

        // Configura il builder con i valori del configMap
        if (hasValidKey("gdprEnabled", configMap)) {
            builder.gdprEnabled(configMap.getBoolean("gdprEnabled"))
        }
        if (hasValidKey("forceConsent", configMap)) {
            builder.forceConsent(configMap.getBoolean("forceConsent"))
        }
        if (hasValidKey("googleAds", configMap)) {
            builder.googleAds(configMap.getBoolean("googleAds"))
        }
        if (hasValidKey("siteId", configMap)) {
            builder.siteId(configMap.getString("siteId"))
        }
        if (hasValidKey("cookiePolicyId", configMap)) {
            builder.cookiePolicyId(configMap.getString("cookiePolicyId"))
        }
        if (hasValidKey("cssContent", configMap)) {
            builder.cssContent(configMap.getString("cssContent"))
        }
        if (hasValidKey("jsonContent", configMap)) {
            builder.jsonContent(configMap.getString("jsonContent"))
        }
        if (hasValidKey("cssUrl", configMap)) {
            builder.cssUrl(configMap.getString("cssUrl"))
        }
        if (hasValidKey("applyStyles", configMap)) {
            builder.applyStyles(configMap.getBoolean("applyStyles"))
        }
        if (hasValidKey("acceptIfDismissed", configMap)) {
            builder.acceptIfDismissed(configMap.getBoolean("acceptIfDismissed"))
        }
        if (hasValidKey("skipNoticeWhenOffline", configMap)) {
            builder.skipNoticeWhenOffline(configMap.getBoolean("skipNoticeWhenOffline"))
        }
        if (hasValidKey("preventDismissWhenLoaded", configMap)) {
            builder.preventDismissWhenLoaded(configMap.getBoolean("preventDismissWhenLoaded"))
        }
        if (hasValidKey("csVersion", configMap)) {
            builder.csVersion(configMap.getString("csVersion"))
        }
        if (hasValidKey("proxyUrl", configMap)) {
            builder.proxyUrl(configMap.getString("proxyUrl"))
        }
        if (hasValidKey("portraitWidth", configMap)) {
            builder.portraitWidth(configMap.getInt("portraitWidth"))
        }
        if (hasValidKey("portraitHeight", configMap)) {
            builder.portraitHeight(configMap.getInt("portraitHeight"))
        }
        if (hasValidKey("landscapeWidth", configMap)) {
            builder.landscapeWidth(configMap.getInt("landscapeWidth"))
        }
        if (hasValidKey("landscapeHeight", configMap)) {
            builder.landscapeHeight(configMap.getInt("landscapeHeight"))
        }

        val config = builder.build()
        IubendaCMP.initialize(context, config)
    }

    @ReactMethod
    fun askConsent() {
        val activity = currentActivity
        IubendaCMP.askConsent(activity);
    }

    @ReactMethod
    fun openPreferences() {
        val activity = currentActivity
        IubendaCMP.openPreferences(activity);
    }

    @ReactMethod
    fun getConsentStatus(promise: Promise) {
    try {
        // Recupera lo stato del consenso dai metodi disponibili
        val consentStatus = mutableMapOf<String, Any?>()

        // Esempio di utilizzo delle impostazioni disponibili
        consentStatus["consentString"] = IubendaCMP.storage.consentString
        consentStatus["googlePersonalized"] = IubendaCMP.storage.googlePersonalized()

        //consentStatus["subjectToGDPR"] = IubendaCMP.storage.subjectToGDPR()
        //consentStatus["cmpPresent"] = IubendaCMP.storage.cmpPresent()
        //consentStatus["vendorConsents"] = IubendaCMP.storage.vendorConsents()
        //consentStatus["purposeConsents"] = IubendaCMP.storage.purposeConsents
        //consentStatus["consentTimestamp"] = IubendaCMP.storage.consentTimestamp()
        //consentStatus["preferenceExpressed"] = IubendaCMP.storage.isPreferenceExpressed()
        //consentStatus["isPurposeConsentGivenFor(1)"] = IubendaCMP.storage.isPurposeConsentGivenFor(1)

        // Risolve il risultato con lo stato del consenso
        promise.resolve(consentStatus)
    } catch (e: Exception) {
        val errorMessage = "getConsentStatus: Errore durante il recupero dello stato del consenso: ${e.message}"
        promise.reject("get_consent_status_error", errorMessage, e)
    }
}


    companion object {
        fun hasValidKey(key: String, options: ReadableMap?): Boolean {
            return options != null && options.hasKey(key) && !options.isNull(key)
        }
    }
}
