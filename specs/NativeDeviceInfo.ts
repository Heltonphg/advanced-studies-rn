import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getAppVersion(): string;
  getStorageInfo(): {totalBytes: number; freeBytes: number};
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeDeviceInfo');
