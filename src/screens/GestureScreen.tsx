import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, PanResponder} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {BlockButton} from '../components/BlockButton';
import {StepFooter} from '../components/StepFooter';

export const GestureScreen: React.FC = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  // ====== Azul: Worklet (UI thread) ======
  const wX = useSharedValue(0);
  const wY = useSharedValue(0);
  const wStartX = useSharedValue(0);
  const wStartY = useSharedValue(0);

  const workletPan = Gesture.Pan()
    .onStart(() => {
      'worklet';
      wStartX.value = wX.value;
      wStartY.value = wY.value;
    })
    .onChange(e => {
      'worklet';
      wX.value = wStartX.value + e.translationX;
      wY.value = wStartY.value + e.translationY;
    });

  const workletStyle = useAnimatedStyle(() => ({
    transform: [{translateX: wX.value}, {translateY: wY.value}],
  }));

  // ====== Vermelho: PanResponder + setState (JS thread) ======
  const [jsPos, setJsPos] = useState({x: 0, y: 0});
  const jsPosRef = useRef({x: 0, y: 0});
  const jsStartRef = useRef({x: 0, y: 0});

  const jsPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        jsStartRef.current = {...jsPosRef.current};
      },
      onPanResponderMove: (_, g) => {
        const next = {
          x: jsStartRef.current.x + g.dx,
          y: jsStartRef.current.y + g.dy,
        };
        jsPosRef.current = next;
        setJsPos(next);
      },
    }),
  ).current;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Passo 4 — Na prática: Gesture</Text>
          <Text style={styles.help}>
            Arraste os dois quadrados. Aperte "Travar JS por ~3s": o azul
            (worklet, UI thread) continua respondendo; o vermelho
            (PanResponder + setState, JS thread) congela junto com o tick.
          </Text>
          <Text style={styles.counter}>Tick (JS thread): {tick}</Text>

          <View style={styles.stagesRow}>
            <View style={styles.stage}>
              <Text style={styles.stageLabel}>Worklet</Text>
              <Text style={styles.stageHint}>UI thread</Text>
              <View style={styles.stageArea}>
                <GestureDetector gesture={workletPan}>
                  <Animated.View style={[styles.boxBlue, workletStyle]} />
                </GestureDetector>
              </View>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageLabel}>PanResponder</Text>
              <Text style={styles.stageHint}>JS thread</Text>
              <View style={styles.stageArea}>
                <View
                  {...jsPanResponder.panHandlers}
                  style={[
                    styles.boxRed,
                    {
                      transform: [
                        {translateX: jsPos.x},
                        {translateY: jsPos.y},
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          <BlockButton duration={3000} title="Travar JS por ~3s" />
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
  stagesRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  stage: {
    flex: 1,
    gap: 2,
  },
  stageLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  stageHint: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },
  stageArea: {
    flex: 1,
    backgroundColor: '#eef',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 4,
  },
  boxBlue: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#3366ff',
  },
  boxRed: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#e0335e',
  },
});
