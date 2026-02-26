import Icon from '@/components/ui/IconNode';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'none',
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 10,
          marginHorizontal: 24,
          marginBottom: 20,
          borderRadius: 999,
          backgroundColor: '#000000',
          borderTopWidth: 0,
          position: 'absolute',
        },
        tabBarItemStyle: {
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 999,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`${focused ? 'bg-white p-4 rounded-full' : ''}`}>
              <Icon name="House" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`${focused ? 'bg-white p-4 rounded-full' : ''}`}>
              <Icon name="Activity" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="promo"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`${focused ? 'bg-white p-4 rounded-full' : ''}`}>
              <Icon name="Tag" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`${focused ? 'bg-white p-4 rounded-full' : ''}`}>
              <Icon name="User" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
