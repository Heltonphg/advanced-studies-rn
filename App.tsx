import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/HomeScreen';
import {BlockingJSScreen} from './src/screens/BlockingJSScreen';
import {ChunkedScreen} from './src/screens/ChunkedScreen';
import {WorkletScreen} from './src/screens/WorkletScreen';
import {GestureScreen} from './src/screens/GestureScreen';
import {ParallaxScreen} from './src/screens/ParallaxScreen';
import type {RootStackParamList} from './src/navigation/types';
import {STEPS, type StepRoute} from './src/navigation/steps';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREENS: Record<StepRoute, React.ComponentType<any>> = {
  BlockingJS: BlockingJSScreen,
  Chunked: ChunkedScreen,
  Worklet: WorkletScreen,
  Gesture: GestureScreen,
  Parallax: ParallaxScreen,
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'RNStudy — Experimentos'}}
            />
            {STEPS.map((step, index) => (
              <Stack.Screen
                key={step.route}
                name={step.route}
                component={SCREENS[step.route]}
                options={{
                  title: `Passo ${index + 1} — ${step.shortTitle}`,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
