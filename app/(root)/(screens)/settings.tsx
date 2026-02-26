import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Settings = () => {
  const { title } = useLocalSearchParams();
  console.log('Title param:', title);
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
