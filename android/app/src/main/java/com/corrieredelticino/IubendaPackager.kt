package com.corrieredelticino

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class IubendaPackager : ReactPackage {

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*,*>> {
        return emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules = mutableListOf<NativeModule>()
        modules.add(IubendaBridge(reactContext))
        return modules
    }
}
