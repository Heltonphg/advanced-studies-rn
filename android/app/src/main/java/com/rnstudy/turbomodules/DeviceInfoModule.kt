package com.rnstudy.turbomodules

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.rnstudy.specs.NativeDeviceInfoSpec // <- a classe GERADA pelo Codegen

/**
 * Exemplo 1 — o menor TurboModule que prova o pipeline inteiro.
 *
 * Estende a classe abstrata gerada pelo Codegen a partir de specs/NativeDeviceInfo.ts
 * e apenas preenche os buracos. Nada é inventado aqui — a assinatura dos métodos
 * abstratos é a verdade, derivada do spec em build.
 */
class DeviceInfoModule(reactContext: ReactApplicationContext) :
  NativeDeviceInfoSpec(reactContext) {

  // Tem que ser idêntico à string do getEnforcing no spec.
  override fun getName() = NAME

  // Síncrono: o valor volta na mesma linha do JS, sem await. Isso é o JSI.
  override fun getAppVersion(): String {
    val pkg = reactApplicationContext.packageName
    val info = reactApplicationContext.packageManager.getPackageInfo(pkg, 0)
    return info.versionName ?: "unknown"
  }

  // JS não tem int/long, só number — que do lado nativo é double.
  // Por isso putDouble, mesmo para bytes. O spec diz number, o Codegen traduz, você obedece.
  override fun getStorageInfo(): WritableMap {
    val dir = reactApplicationContext.filesDir
    return Arguments.createMap().apply {
      putDouble("totalBytes", dir.totalSpace.toDouble())
      putDouble("freeBytes", dir.freeSpace.toDouble())
    }
  }

  companion object {
    const val NAME = "NativeDeviceInfo"
  }
}
