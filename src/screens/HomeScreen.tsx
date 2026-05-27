import React from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';
import {STEPS, SECTIONS} from '../navigation/steps';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>RNStudy</Text>
      <Text style={styles.subtitle}>
        Roteiro sequencial: vá do Passo 1 ao 6 coletando evidências.
      </Text>

      <Pressable
        onPress={() => navigation.navigate(STEPS[0].route)}
        style={({pressed}) => [styles.startBtn, pressed && styles.pressed]}>
        <Text style={styles.startBtnText}>Começar do Passo 1 →</Text>
      </Pressable>

      {SECTIONS.map(section => {
        const stepsInSection = STEPS.filter(s => s.section === section);
        return (
          <View key={section} style={styles.section}>
            <Text style={styles.sectionTitle}>{section}</Text>
            {stepsInSection.map(step => {
              const index = STEPS.indexOf(step) + 1;
              return (
                <Pressable
                  key={step.route}
                  onPress={() => navigation.navigate(step.route)}
                  style={({pressed}) => [
                    styles.stepBtn,
                    pressed && styles.pressed,
                  ]}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>{index}</Text>
                  </View>
                  <Text style={styles.stepBtnText}>{step.shortTitle}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 24, gap: 16, paddingBottom: 48},
  title: {fontSize: 28, fontWeight: '700'},
  subtitle: {color: '#555', marginBottom: 8},
  startBtn: {
    backgroundColor: '#3366ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  startBtnText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  section: {gap: 8, marginTop: 8},
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  stepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f2f4f8',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3366ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {color: '#fff', fontWeight: '700'},
  stepBtnText: {fontSize: 16, color: '#222', flex: 1},
  pressed: {opacity: 0.7},
});
