package com.rnstudy.turbomodules

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.rnstudy.specs.NativeBatteryInfoSpec // <- a classe GERADA pelo Codegen

/**
 * Exemplo 2 — o módulo útil, com os três padrões reais de comunicação nativa:
 *  - Promise  → leitura que pode ter custo (getLevel)
 *  - Síncrono → snapshot instantâneo (getState)
 *  - Evento   → notificação quando o estado muda (onBatteryLevelChange)
 *
 * O método emitOnBatteryLevelChange já vem PRONTO na classe gerada (protected final),
 * com o transporte para o JS embutido — aqui a gente só o chama.
 */
class BatteryInfoModule(reactContext: ReactApplicationContext) :
  NativeBatteryInfoSpec(reactContext) {

  private var receiver: BroadcastReceiver? = null

  override fun getName() = NAME

  // Promise: pode falhar, então resolve/reject.
  override fun getLevel(promise: Promise) {
    try {
      val bm =
        reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      promise.resolve(bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY))
    } catch (e: Exception) {
      promise.reject("ERR_BATTERY", e.message, e)
    }
  }

  // Síncrono: snapshot, volta na hora.
  override fun getState(): String {
    val intent =
      reactApplicationContext.registerReceiver(
        null,
        IntentFilter(Intent.ACTION_BATTERY_CHANGED),
      )
    return when (intent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1) {
      BatteryManager.BATTERY_STATUS_CHARGING -> "charging"
      BatteryManager.BATTERY_STATUS_FULL -> "full"
      BatteryManager.BATTERY_STATUS_DISCHARGING -> "discharging"
      else -> "unknown"
    }
  }

  // Evento: registra o receiver e emite pelo método gerado.
  override fun startMonitoring() {
    if (receiver != null) return
    receiver =
      object : BroadcastReceiver() {
        override fun onReceive(c: Context?, intent: Intent?) {
          val level = intent?.getIntExtra(BatteryManager.EXTRA_LEVEL, 0) ?: 0
          emitOnBatteryLevelChange(Arguments.createMap().apply { putInt("level", level) })
        }
      }
    reactApplicationContext.registerReceiver(
      receiver,
      IntentFilter(Intent.ACTION_BATTERY_CHANGED),
    )
  }

  override fun stopMonitoring() {
    receiver?.let { reactApplicationContext.unregisterReceiver(it) }
    receiver = null
  }

  companion object {
    const val NAME = "NativeBatteryInfo"
  }
}
