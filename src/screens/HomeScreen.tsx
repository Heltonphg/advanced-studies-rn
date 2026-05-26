import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experimentos</Text>
      <View style={styles.item}>
        <Button
          title="A — Bloquear JS Thread"
          onPress={() => navigation.navigate('BlockingJS')}
        />
      </View>
      <View style={styles.item}>
        <Button
          title="B — Chunks com setTimeout"
          onPress={() => navigation.navigate('Chunked')}
        />
      </View>
      <View style={styles.item}>
        <Button
          title="C — InteractionManager"
          onPress={() => navigation.navigate('Interaction')}
        />
      </View>
      <View style={styles.item}>
        <Button
          title="D — Worklet (animação sem travar)"
          onPress={() => navigation.navigate('Worklet')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, gap: 12, justifyContent: 'center'},
  title: {fontSize: 22, fontWeight: '600', marginBottom: 16},
  item: {marginVertical: 6},
});
