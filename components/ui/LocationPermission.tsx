import * as Location from "expo-location";
import React, { useState } from "react";
import { Alert, Linking, Platform, Text, View } from "react-native";
import CustomButton from "../auth/CustomButton";
import Icon from "./IconNode";

type Props = {
  onGranted?: () => void;
  onSkip?: () => void;
};

const LocationPermission: React.FC<Props> = ({ onGranted, onSkip }) => {
  const [loading, setLoading] = useState(false);

  const enableLocation = async () => {
    setLoading(true);
    try {
      const { granted, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      if (granted) {
        // Alert.alert("Location Enabled", "We can now find rides near you.");
        onGranted?.();
        return;
      }

      const actions: { text: string; onPress?: () => void }[] = [
        { text: "OK" },
      ];
      if (!canAskAgain) {
        actions.unshift({
          text: "Open Settings",
          onPress: () => {
            if (typeof Linking.openSettings === "function") {
              Linking.openSettings();
            } else if (Platform.OS === "ios") {
              Linking.openURL("app-settings:");
            }
          },
        });
      }

    //   Alert.alert(
    //     "Permission Denied",
    //     "Enable location in Settings to find rides nearby.",
    //     actions
    //   );
    } catch {
    //   Alert.alert("Error", "Failed to request location permission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-10 bg-card rounded-lg shadow-md w-80 justify-between items-center">
      <View className="rounded-full bg-success">
        <Icon name="MapPin" size={32} color="white" />
      </View>

      <View className="flex flex-col items-center">
        <Text className="text-text font-Bold">Enable Location</Text>
        <Text className="text-center text-textMuted">
          To find rides near you, please enable location services.
        </Text>
      </View>

      <View className="flex flex-col gap-4 w-full mt-8">
        <CustomButton
          title="Enable Location"
          onPress={enableLocation}
          loading={loading}
        />
        <CustomButton title="Maybe Later" onPress={() => onSkip?.()} />
      </View>
    </View>
  );
};

export default LocationPermission;
