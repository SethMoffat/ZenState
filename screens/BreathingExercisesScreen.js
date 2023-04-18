import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const breathingData = [
  { id: '1', title: '4-7-8 Breathing Technique' },
  { id: '2', title: 'Box Breathing' },
  { id: '3', title: 'Deep Breathing' },
];

function BreathingItem({ title }) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function BreathingExercisesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercises</Text>
      <FlatList
        data={breathingData}
        renderItem={({ item }) => <BreathingItem title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  itemTitle: {
    fontSize: 18,
  },
});
