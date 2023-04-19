import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';


const breathingData = [
  {
    id: '1',
    title: '4-7-8 Breathing Exercise',
    audio: Asset.fromModule(require('../BreathingAudio/4-7-8_Calm_Breathing_Exercise.mp3')).uri,
    voice:'Matthew Hall'
  },
  { id: '2', title: 'Box Breathing', duration: 60 },
  { id: '3', title: 'Deep Breathing', duration: 60 },
];

function BreathingItem({ title, duration, audio, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(duration, audio)}>
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

  async function startTimer(duration, audio) {
    setTimeRemaining(duration);
    setTimer(duration);

    const soundObject = new Audio.Sound();
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      await soundObject.loadAsync({ uri: audio });
      await soundObject.playAsync();
    } catch (error) {
      console.warn(error);
    }
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercises</Text>
      <FlatList
        data={breathingData}
        renderItem={({ item }) => (
          <BreathingItem
            title={item.title}
            duration={item.duration}
            audio={item.audio}
            onPress={startTimer}
          />
        )}
        keyExtractor={item => item.id}
      />
      {timer && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>
      )}
    </View>
  );}
  
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