import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import AudioPlayer from '../AudioPlayer';

export default function ActiveMeditation() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, audio } = route.params;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function loadAudio() {
      const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
          setProgress(status.positionMillis / status.durationMillis);
        }
      };

      await AudioPlayer.playAudio(audio);
      AudioPlayer.sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }

    loadAudio();

    return () => {
      AudioPlayer.sound.setOnPlaybackStatusUpdate(null);
      AudioPlayer.unloadAudio();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={progress} color="#6200EE" style={styles.progressBar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  progressBar: {
    height: 10,
  },
});