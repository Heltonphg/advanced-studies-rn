import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';

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
      <Text style={styles.title}>Parte B — Chunks com setTimeout</Text>
      <Text style={styles.help}>
        Mesmo trabalho da Parte A, mas quebrado em chunks. O spinner e o
        contador continuam vivos entre os chunks.
      </Text>
      <ActivityIndicator size="large" />
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
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 16, justifyContent: 'center'},
  title: {fontSize: 20, fontWeight: '600'},
  help: {color: '#555'},
  counter: {fontSize: 18, textAlign: 'center'},
});
