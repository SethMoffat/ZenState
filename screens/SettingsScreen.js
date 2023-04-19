import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <Text style={[styles.title, darkTheme && styles.darkTitle]}>Settings</Text>
      <Text style={[styles.text, darkTheme && styles.darkText]}>
        Customize your ZenState experience with reminders, themes, and more.
      </Text>
      <TouchableOpacity style={styles.themeSwitcher} onPress={toggleTheme}>
        <Text style={[styles.themeSwitcherText, darkTheme && styles.darkThemeSwitcherText]}>
          {darkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        </Text>
      </TouchableOpacity>
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
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkTitle: {
    color: '#fff',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  themeSwitcher: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  themeSwitcherText: {
    color: '#fff',
    fontSize: 16,
  },
  darkThemeSwitcherText: {
    color: '#000',
  },
});