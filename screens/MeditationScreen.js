import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const meditationData = [
  { id: '1', title: 'Guided Meditation for Anxiety', audio: 'https://example.com/audio1.mp3' },
  { id: '2', title: 'Mindfulness Meditation', audio: 'https://example.com/audio2.mp3' },
  { id: '3', title: 'Body Scan Meditation', audio: 'https://example.com/audio3.mp3' },
  { id: '4', title: 'Loving-Kindness Meditation', audio: 'https://example.com/audio4.mp3' },
];

function MeditationItem({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function MeditationScreen() {
  const [sound, setSound] = useState(null);

  async function playAudio(audioUrl) {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
    setSound(newSound);

    await newSound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditations</Text>
      <FlatList
        data={meditationData}
        renderItem={({ item }) => (
          <MeditationItem title={item.title} onPress={() => playAudio(item.audio)} />
        )}
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