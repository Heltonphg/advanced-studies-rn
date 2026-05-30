import type {EventSubscription} from 'react-native';

declare module 'react-native' {
  export type EventEmitter<T> = (
    handler: (arg: T) => void | Promise<void>,
  ) => EventSubscription;
}
