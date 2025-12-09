import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Icon from "./IconNode";

// ---------------- TextInputField ----------------
interface TextInputFieldProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  error?: string;
  iconName?: keyof typeof import("lucide-react-native").icons;
  loading?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secure = false,
  error,
  iconName,
  loading,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(!secure);
  const shakeAnim = useSharedValue(0);

  // Trigger shake when error changes
  useEffect(() => {
    if (error) {
      shakeAnim.value = 0; // reset before shaking
      shakeAnim.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error, shakeAnim]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnim.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]} className="w-full mb-4">
      <View
        className={`flex-row items-center bg-foreground border rounded-2xl px-4 py-3 ${
          error ? "border-error" : "border-border"
        }`}
      >
        {iconName && <Icon name={iconName} color="#9CA3AF" size={20} />}
        <TextInput
          className="flex-1 ml-2 text-base font-Regular text-text"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isVisible}
          editable={!loading}
          {...rest}
        />
        {secure && (
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Icon
              name={isVisible ? "Eye" : "EyeOff"}
              color="#9CA3AF"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-error text-sm mt-1">{error}</Text>}
    </Animated.View>
  );
};

export default TextInputField;
