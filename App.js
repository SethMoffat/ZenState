import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import MeditationScreen from './screens/MeditationScreen';
import BreathingExercisesScreen from './screens/BreathingExercisesScreen';
import ProgressTrackerScreen from './screens/ProgressTrackerScreen';
import SettingsScreen from './screens/SettingsScreen';
import ActiveMeditation from './screens/ActiveMeditation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meditation" component={MeditationScreen} />
      <Tab.Screen name="Breathing" component={BreathingExercisesScreen} />
      <Tab.Screen name="Progress" component={ProgressTrackerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="ActiveMeditation" component={ActiveMeditation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}