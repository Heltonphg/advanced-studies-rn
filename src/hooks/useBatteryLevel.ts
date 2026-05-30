import {useEffect, useState} from 'react';
import Battery from '../../specs/NativeBatteryInfo';

export function useBatteryLevel() {
  const [level, setLevel] = useState<number | null>(null);
  const [state, setState] = useState('unknown');

  useEffect(() => {
    Battery.getLevel().then(setLevel); 
    setState(Battery.getState());
    Battery.startMonitoring();

    const sub = Battery.onBatteryLevelChange(({level: l}) => setLevel(l));
    return () => {
      sub.remove();
      Battery.stopMonitoring();
    }; 
  }, []);

  return {level, state};
}
