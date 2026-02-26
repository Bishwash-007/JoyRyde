import { useEffect } from 'react';
import {
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface CustomButtonProps {
  title?: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  onPress,
  loading,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
    } else {
      rotation.value = 0;
    }
  }, [loading, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-4 rounded-3xl w-full border border-borderMuted bg-primary"
      disabled={loading}
    >
      <View className="flex-row items-center justify-center gap-x-3">
        {loading && (
          <Animated.View style={[animatedStyle]}>
            <View className="w-5 h-5 border-2 border-borderMuted rounded-full border-t-black" />
          </Animated.View>
        )}

        {title && (
          <Text className="text-center font-Regular text-base text-textInverted">
            {loading ? 'Please wait...' : title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
