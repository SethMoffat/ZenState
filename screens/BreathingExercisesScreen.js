import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const breathingData = [
  { id: '1', title: '4-7-8 Breathing Technique', duration: 60 },
  { id: '2', title: 'Box Breathing', duration: 60 },
  { id: '3', title: 'Deep Breathing', duration: 60 },
];

function BreathingItem({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function BreathingExercisesScreen() {
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let interval = null;

    if (timer) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining => {
          if (timeRemaining > 0) {
            return timeRemaining - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  function startTimer(duration) {
    setTimeRemaining(duration);
    (setTimer) => setTimeout(() => setTimer(null), duration * 1000);
  }
  
  return (
  <View style={styles.container}>
  <Text style={styles.title}>Breathing Exercises</Text>
  <FlatList
  data={breathingData}
  renderItem={({ item }) => (
  <BreathingItem title={item.title} onPress={() => startTimer(item.duration)} />
  )}
  keyExtractor={item => item.id}
  />
  {timer && (
  <View style={styles.timerContainer}>
  <Text style={styles.timerText}>{timeRemaining} seconds remaining</Text>
  </View>
  )}
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
  timerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  },
  timerText: {
  fontSize: 18,
  fontWeight: 'bold',
  },
  });