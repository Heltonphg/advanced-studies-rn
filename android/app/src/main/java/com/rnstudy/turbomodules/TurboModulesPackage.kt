package com.rnstudy.turbomodules

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

/**
 * Registro que diz ao React Native qual classe instanciar quando o JS pedir
 * cada módulo. Um único package atende os dois exemplos.
 *
 * needsEagerInit = false → o módulo nasce no PRIMEIRO uso, não no boot do app.
 * É aqui que o lazy load deixa de ser bullet point de marketing e vira sua linha de código.
 */
class TurboModulesPackage : BaseReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    when (name) {
      DeviceInfoModule.NAME -> DeviceInfoModule(reactContext)
      BatteryInfoModule.NAME -> BatteryInfoModule(reactContext)
      else -> null
    }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      DeviceInfoModule.NAME to
        ReactModuleInfo(
          DeviceInfoModule.NAME,
          DeviceInfoModule.NAME,
          false, // canOverrideExistingModule
          false, // needsEagerInit  ← false = LAZY
          false, // isCxxModule
          true, // isTurboModule
        ),
      BatteryInfoModule.NAME to
        ReactModuleInfo(
          BatteryInfoModule.NAME,
          BatteryInfoModule.NAME,
          false,
          false,
          false,
          true,
        ),
    )
  }
}
