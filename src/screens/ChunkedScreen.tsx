import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';
import {JsSpinner} from '../components/JsSpinner';
import {StepFooter} from '../components/StepFooter';

const TOTAL_ITERATIONS = 500_000_000;
const CHUNK_SIZE = 25_000_000;

export const ChunkedScreen: React.FC = () => {
  const [tick, setTick] = useState(0);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  const runChunked = () => {
    setRunning(true);
    setProgress(0);
    let processed = 0;
    let acc = 0;

    const step = () => {
      const end = Math.min(processed + CHUNK_SIZE, TOTAL_ITERATIONS);
      for (let i = processed; i < end; i++) {
        acc += i;
      }
      processed = end;
      setProgress(processed / TOTAL_ITERATIONS);

      if (processed < TOTAL_ITERATIONS) {
        setTimeout(step, 0);
      } else {
        setRunning(false);
        console.log(`Chunked terminou. acc=${acc}`);
      }
    };

    setTimeout(step, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Passo 2 — Solução 1: Chunks</Text>
        <Text style={styles.help}>
          Mesmo trabalho do Passo 1, mas quebrado em chunks com setTimeout.
          Agora o spinner JS-driven continua vivo entre os chunks — porque a
          JS thread "respira" entre eles.
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
        <Text style={styles.counter}>
          Progresso: {(progress * 100).toFixed(1)}%
        </Text>
        <Button
          title={running ? 'Rodando…' : 'Rodar em chunks'}
          onPress={runChunked}
          disabled={running}
        />
      </View>
      <StepFooter route="Chunked" />
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
