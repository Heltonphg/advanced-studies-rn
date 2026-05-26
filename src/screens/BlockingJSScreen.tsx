import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {BlockButton} from '../components/BlockButton';

export const BlockingJSScreen: React.FC = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parte A — Loop bloqueante</Text>
      <Text style={styles.help}>
        Aperte o botão. O contador e o spinner devem travar enquanto o loop
        roda na JS thread.
      </Text>
      <ActivityIndicator size="large" />
      <Text style={styles.counter}>Tick: {tick}</Text>
      <BlockButton duration={2000} title="Travar JS por ~2s" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 16, justifyContent: 'center'},
  title: {fontSize: 20, fontWeight: '600'},
  help: {color: '#555'},
  counter: {fontSize: 18, textAlign: 'center'},
});
