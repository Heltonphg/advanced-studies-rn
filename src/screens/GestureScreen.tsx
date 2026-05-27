import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {BlockButton} from '../components/BlockButton';
import {StepFooter} from '../components/StepFooter';

export const GestureScreen: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  const pan = Gesture.Pan()
    .onStart(() => {
      'worklet';
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onChange(e => {
      'worklet';
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      'worklet';
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Passo 5 — Na prática: Gesture</Text>
          <Text style={styles.help}>
            Arraste o quadrado. Depois trave a JS thread e tente arrastar de
            novo — o gesto continua fluido porque o worklet roda na UI thread.
          </Text>
          <Text style={styles.counter}>Tick (JS thread): {tick}</Text>

          <View style={styles.stage}>
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.box, animatedStyle]} />
            </GestureDetector>
          </View>

          <BlockButton
            duration={3000}
            title="Travar JS por ~3s (gesto segue)"
          />
        </View>
        <StepFooter route="Gesture" />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 12},
  body: {flex: 1, gap: 12},
  title: {fontSize: 20, fontWeight: '600'},
  help: {color: '#555'},
  counter: {fontSize: 16, textAlign: 'center'},
  stage: {
    flex: 1,
    backgroundColor: '#eef',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#3366ff',
  },
});
