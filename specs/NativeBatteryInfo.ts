import type {TurboModule, EventEmitter} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

type BatteryLevel = {level: number};

export interface Spec extends TurboModule {
  getLevel(): Promise<number>; 
  getState(): string; 
  startMonitoring(): void;
  stopMonitoring(): void;
  readonly onBatteryLevelChange: EventEmitter<BatteryLevel>; 
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBatteryInfo');
