import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';
import {StepFooter} from '../components/StepFooter';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const InteractionScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [status, setStatus] = useState('idle');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  const runHeavyAfterInteractions = () => {
    setStatus('agendado — aguardando interações terminarem…');
    InteractionManager.runAfterInteractions(() => {
      setStatus('rodando trabalho pesado…');
      const start = Date.now();
      let acc = 0;
      for (let i = 0; i < 300_000_000; i++) {
        acc += i;
      }
      setStatus(`pronto em ${Date.now() - start}ms (acc=${acc})`);
    });
  };

  const navigateThenHeavy = () => {
    navigation.navigate('BlockingJS');
    InteractionManager.runAfterInteractions(() => {
      console.log('Navegação completou — agora seguro processar.');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Passo 3 — Solução 2: InteractionManager</Text>
        <Text style={styles.help}>
          Use isto para adiar trabalho pesado até depois das
          animações/navegação terminarem.
        </Text>
        <ActivityIndicator size="large" />
        <Text style={styles.counter}>Tick: {tick}</Text>
        <Text style={styles.status}>Status: {status}</Text>
        <Button
          title="Rodar pesado após interações"
          onPress={runHeavyAfterInteractions}
        />
        <View style={{height: 12}} />
        <Button
          title="Navegar e logar após transição"
          onPress={navigateThenHeavy}
        />
      </View>
      <StepFooter route="Interaction" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 12},
  body: {flex: 1, gap: 12, justifyContent: 'center'},
  title: {fontSize: 20, fontWeight: '600'},
  help: {color: '#555'},
  counter: {fontSize: 18, textAlign: 'center'},
  status: {fontSize: 14, color: '#333', textAlign: 'center'},
});
