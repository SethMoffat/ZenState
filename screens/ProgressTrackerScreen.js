import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.text}>
        Track your meditation and breathing exercise progress here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});