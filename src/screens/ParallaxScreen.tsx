import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {BlockButton} from '../components/BlockButton';
import {StepFooter} from '../components/StepFooter';

const HEADER_HEIGHT = 220;

export const ParallaxScreen: React.FC = () => {
  const scrollY = useSharedValue(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{translateY: -scrollY.value * 0.5}],
    opacity: interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [1, 0.2],
      Extrapolation.CLAMP,
    ),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, HEADER_HEIGHT],
          [1, 0.7],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Text style={[styles.headerText, titleStyle]}>
          Parallax 🌊
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Text style={styles.help}>
            Role a lista. O header tem parallax via worklet (UI thread). Depois
            trave a JS — o parallax continua suave.
          </Text>
          <Text style={styles.counter}>Tick (JS thread): {tick}</Text>
          <BlockButton
            duration={3000}
            title="Travar JS por ~3s (parallax segue)"
          />
        </View>

        {Array.from({length: 40}).map((_, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.rowText}>Item #{i + 1}</Text>
          </View>
        ))}

        <View style={styles.footerWrap}>
          <StepFooter route="Parallax" />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: '#3366ff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {color: '#fff', fontSize: 32, fontWeight: '700'},
  scrollContent: {paddingTop: HEADER_HEIGHT},
  topBar: {padding: 16, gap: 12, backgroundColor: '#fff'},
  help: {color: '#555'},
  counter: {fontSize: 16},
  row: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  rowText: {fontSize: 16},
  footerWrap: {padding: 16, backgroundColor: '#fff'},
});
