// import { AppleMaps, GoogleMaps } from "expo-maps";
import LocationPermission from "@/components/ui/LocationPermission";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const [showPermissionCard, setShowPermissionCard] = useState(true);

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

  return (
    <View className="bg-background flex-1 px-6">
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
    </View>
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
