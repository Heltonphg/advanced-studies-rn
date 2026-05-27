import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import {BlockButton} from '../components/BlockButton';
import {StepFooter} from '../components/StepFooter';

export const WorkletScreen: React.FC = () => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const startAnimation = () => {
    translateX.value = withRepeat(
      withTiming(220, {duration: 1000, easing: Easing.inOut(Easing.quad)}),
      -1,
      true,
    );
  };

  const stopAnimation = () => {
    cancelAnimation(translateX);
    translateX.value = 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Passo 4 — Solução 3: Worklet (UI thread)</Text>
        <Text style={styles.help}>
          Inicie a animação e depois trave a JS thread. Por rodar como worklet
          na UI thread, a animação continua suave.
        </Text>

        <View style={styles.track}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </View>

        <Button title="Iniciar animação" onPress={startAnimation} />
        <View style={{height: 8}} />
        <Button title="Parar animação" onPress={stopAnimation} />
        <View style={{height: 16}} />
        <BlockButton duration={3000} title="Travar JS por ~3s (UI segue)" />
      </View>
      <StepFooter route="Worklet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 12},
  body: {flex: 1, gap: 12, justifyContent: 'center'},
  title: {fontSize: 20, fontWeight: '600'},
  help: {color: '#555'},
  track: {
    height: 80,
    backgroundColor: '#eef',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#3366ff',
  },
});
