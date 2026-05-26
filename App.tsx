import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/HomeScreen';
import {BlockingJSScreen} from './src/screens/BlockingJSScreen';
import {ChunkedScreen} from './src/screens/ChunkedScreen';
import {InteractionScreen} from './src/screens/InteractionScreen';
import {WorkletScreen} from './src/screens/WorkletScreen';
import type {RootStackParamList} from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'RNStudy — Experimentos'}}
          />
          <Stack.Screen
            name="BlockingJS"
            component={BlockingJSScreen}
            options={{title: 'A — Blocking JS'}}
          />
          <Stack.Screen
            name="Chunked"
            component={ChunkedScreen}
            options={{title: 'B — Chunked'}}
          />
          <Stack.Screen
            name="Interaction"
            component={InteractionScreen}
            options={{title: 'C — InteractionManager'}}
          />
          <Stack.Screen
            name="Worklet"
            component={WorkletScreen}
            options={{title: 'D — Worklet'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
