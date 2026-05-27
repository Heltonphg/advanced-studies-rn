import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {BlockButton} from '../components/BlockButton';
import {JsSpinner} from '../components/JsSpinner';
import {StepFooter} from '../components/StepFooter';

export const BlockingJSScreen: React.FC = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Passo 1 — O problema</Text>
        <Text style={styles.help}>
          Aperte o botão. Observe: o spinner JS e o tick travam. O
          ActivityIndicator nativo continua — porque ele é animado pela UI
          thread, não pela JS thread.
        </Text>

        <View style={styles.spinnerRow}>
          <View style={styles.spinnerCol}>
            <ActivityIndicator size="large" />
            <Text style={styles.spinnerLabel}>Nativo</Text>
            <Text style={styles.spinnerHint}>(UI thread)</Text>
          </View>
          <View style={styles.spinnerCol}>
            <JsSpinner size={40} />
            <Text style={styles.spinnerLabel}>JS-driven</Text>
            <Text style={styles.spinnerHint}>(setInterval + setState)</Text>
          </View>
        </View>

        <Text style={styles.counter}>Tick: {tick}</Text>
        <BlockButton duration={2000} title="Travar JS por ~2s" />
      </View>
      <StepFooter route="BlockingJS" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 16},
  body: {flex: 1, gap: 16, justifyContent: 'center'},
  title: {fontSize: 20, fontWeight: '600'},
  help: {color: '#555'},
  counter: {fontSize: 18, textAlign: 'center'},
  spinnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  spinnerCol: {alignItems: 'center', gap: 4},
  spinnerLabel: {fontSize: 14, fontWeight: '600', color: '#333'},
  spinnerHint: {fontSize: 11, color: '#888'},
});
