// import { AppleMaps, GoogleMaps } from "expo-maps";
import Icon from '@/components/ui/IconNode';
import LocationPermission from '@/components/ui/LocationPermission';
import TextInputField from '@/components/ui/TextInputField';
import { registerUser } from '@/services/auth';
import axios from 'axios';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = () => {
  const [showPermissionCard, setShowPermissionCard] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationPending, setIsLocationPending] = useState(true);

  const [location, setLocation] = useState<Location.LocationObject | null>();
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await Location.getForegroundPermissionsAsync();
        setShowPermissionCard(!status.granted);
      } catch {
        setShowPermissionCard(true);
      }
    };
    checkPermission();
  }, []);

  const handleRegister = async () => {
    try {
      const payload = {
        email: 'drewwbishwash@gmail.com',
        password: 'H3ll0w0rld!',
        role: 'customer',
      };

      const data = await registerUser(payload);
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  setTimeout(() => {
    setIsLocationPending(false);
  }, 5000);

  // handleRegister();

  return (
    <ScrollView className="bg-background flex-1 px-6 pt-12">
      <View>
        {isLocationPending ? (
          <View className="inline-flex flex-col items-center justify-center">
            <Text className="text-text text-2xl font-bold">
              Searching your location...
            </Text>
          </View>
        ) : (
          <View>
            <View className="inline-flex flex-row items-center justify-between">
              {isModalOpen && (
                <TouchableOpacity>
                  <Icon name="X" size={28} color="#000000" />
                </TouchableOpacity>
              )}

              <Text className="text-text text-2xl font-bold">
                Let&apos;s Travel Together
              </Text>
              <View style={{ width: 28 }} />
            </View>

            <View className="flex flex-row justify-start items-center bg-input rounded-2xl p-2 border-1 mt-6">
              <View>
                <Icon name="MapPin" size={24} color="#909090" />
              </View>
              <TextInput
                placeholder="Enter your destination"
                placeholderTextColor={'gray'}
                className="text-text ml-2 flex-1 h-12"
              />
              <View className="ml-auto">
                <Icon name="Map" size={24} color="#909090" />
              </View>
            </View>
          </View>
        )}
      </View>
      {/* <MapView /> */}

      <View className="justify-center items-center h-full">
        {showPermissionCard ? (
          <LocationPermission
            onGranted={() => setShowPermissionCard(false)}
            onSkip={() => setShowPermissionCard(false)}
          />
        ) : (
          <Text className="text-text">
            Location enabled. Showing nearby rides soon.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

// const MapView = () => {
//   if (Platform.OS === "ios") {
//     return <AppleMaps.View style={{ flex: 1 }} />;
//   } else if (Platform.OS === "android") {
//     return <GoogleMaps.View style={{ flex: 1 }} />;
//   } else {
//     return <Text>Map is not supported on this platform.</Text>;
//   }
// };
