import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from './specs/NativeDeviceInfo';
import {useBatteryLevel} from './src/hooks/useBatteryLevel';

function formatBytes(bytes: number): string {
  const gb = bytes / 1024 ** 3;
  return `${gb.toFixed(2)} GB`;
}

const DeviceInfoCard: React.FC = () => {
  // Sem await. O valor volta na mesma linha. Isso é o JSI por baixo.
  const version = DeviceInfo.getAppVersion();
  const {totalBytes, freeBytes} = DeviceInfo.getStorageInfo();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>NativeDeviceInfo</Text>
      <Text style={styles.cardHint}>JSI síncrono + lazy load</Text>
      <Row label="App version" value={version} />
      <Row label="Storage total" value={formatBytes(totalBytes)} />
      <Row label="Storage free" value={formatBytes(freeBytes)} />
    </View>
  );
};

const BatteryCard: React.FC = () => {
  const {level, state} = useBatteryLevel();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>NativeBatteryInfo</Text>
      <Text style={styles.cardHint}>Promise + síncrono + evento tipado</Text>
      <Row label="Level" value={level == null ? '…' : `${level}%`} />
      <Row label="State" value={state} />
    </View>
  );
};

const Row: React.FC<{label: string; value: string}> = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>RNStudy — TurboModules</Text>
          <Text style={styles.subtitle}>
            Dois módulos nativos tipados, do spec ao device.
          </Text>
          <DeviceInfoCard />
          <BatteryCard />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#888',
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  cardHint: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 15,
    opacity: 0.8,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default App;
