import { View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <View className="dark bg-background text-text h-12" />
      <View className="bg-primary h-12" />
      <View className="bg-foreground h-12" />
      <View className="bg-error h-12" />
      <View className="bg-success h-12" />
      <View className="bg-muted-200 h-12" />
    </View>
  );
};

export default HomeScreen;
