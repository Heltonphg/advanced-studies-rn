import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';
import {
  STEPS,
  getStep,
  getStepIndex,
  getNextStep,
  type StepRoute,
} from '../navigation/steps';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  route: StepRoute;
};

export const StepFooter: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<Nav>();
  const step = getStep(route);
  const index = getStepIndex(route);
  const next = getNextStep(route);
  const total = STEPS.length;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {width: `${((index + 1) / total) * 100}%`},
          ]}
        />
      </View>

      <Text style={styles.progressLabel}>
        Passo {index + 1} de {total} · {step.section}
      </Text>

      <View style={styles.evidenceBox}>
        <Text style={styles.evidenceTitle}>📸 Tirar evidência</Text>
        <Text style={styles.evidenceText}>{step.evidence}</Text>
      </View>

      <View style={styles.navRow}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={({pressed}) => [
            styles.btn,
            styles.btnGhost,
            pressed && styles.btnPressed,
          ]}>
          <Text style={styles.btnGhostText}>← Menu</Text>
        </Pressable>

        {next ? (
          <Pressable
            onPress={() => navigation.navigate(next.route)}
            style={({pressed}) => [
              styles.btn,
              styles.btnPrimary,
              pressed && styles.btnPressed,
            ]}>
            <Text style={styles.btnPrimaryText}>
              Próximo: {next.shortTitle} →
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={({pressed}) => [
              styles.btn,
              styles.btnPrimary,
              pressed && styles.btnPressed,
            ]}>
            <Text style={styles.btnPrimaryText}>Concluir ✓</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingTop: 12,
    gap: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3366ff',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  evidenceBox: {
    backgroundColor: '#fff8e1',
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  evidenceTitle: {fontSize: 13, fontWeight: '600', color: '#7a5a00'},
  evidenceText: {fontSize: 12, color: '#6b4f00', lineHeight: 16},
  navRow: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhost: {
    backgroundColor: '#f2f2f2',
    flex: 0.4,
  },
  btnGhostText: {color: '#333', fontWeight: '500'},
  btnPrimary: {
    backgroundColor: '#3366ff',
    flex: 0.6,
  },
  btnPrimaryText: {color: '#fff', fontWeight: '600'},
  btnPressed: {opacity: 0.7},
});
