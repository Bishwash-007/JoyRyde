import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList as RNFlatList,
} from "react-native";

const { width } = Dimensions.get("window");

// ---------- Types ----------
interface OnboardItem {
  id: string;
  title: string;
  caption: string;
  image: string;
}

// ---------- Data ----------
const data: OnboardItem[] = [
  {
    id: "1",
    title: "Joy Ride",
    caption:
      "Hassle-free rides at your fingertips. Book a ride anytime, anywhere.",
    image: "https://pxhere.com/en/photo/253",
  },
  {
    id: "2",
    title: "Fast & Reliable",
    caption:
      "Get to your destination quickly with our trusted drivers and optimized routes.",
    image: "https://pxhere.com/en/photo/717905",
  },
  {
    id: "3",
    title: "Safe & Secure",
    caption:
      "Ride with confidence. Our drivers and platform are fully verified for your safety.",
    image: "https://pxhere.com/en/photo/1056127",
  },
];

// ---------- Component ----------
const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<RNFlatList<OnboardItem>>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const skip = () => {
    flatListRef.current?.scrollToIndex({ index: data.length - 1 });
  };

  const getStarted = () => router.replace("/get-started");

  const isLastSlide = currentIndex === data.length - 1;

  return (
    <View className="flex-1 bg-white px-6 pt-36">
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        renderItem={({ item }) => <RenderItem item={item} />}
      />

      {/* Pagination */}
      <View className="flex-row items-center justify-center mt-4">
        {data.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full mx-1 ${
              currentIndex === i ? "w-6 bg-black" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Buttons */}
      <View className="flex-row items-center justify-between px-6 mt-6 mb-10">
        {/* Skip (Hide on last slide) */}
        {!isLastSlide ? (
          <TouchableOpacity onPress={skip}>
            <Text className="text-gray-500 text-base font-Poppins_Regular">
              Skip
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {/* Next / Get Started */}
        <TouchableOpacity
          onPress={isLastSlide ? getStarted : nextSlide}
          className="bg-black px-6 py-3 rounded-full"
        >
          <Text className="text-white text-base font-Poppins_Regular">
            {isLastSlide ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

// ---------- Render Item ----------
const RenderItem = ({ item }: { item: OnboardItem }) => {
  return (
    <View className="w-screen flex-1 px-6 items-center justify-center">
      <Image
        source={{ uri: item.image }}
        style={{ width: width * 0.9, height: 260, borderRadius: 12 }}
        resizeMode="cover"
      />

      <Text className="text-3xl font-Poppins_Bold text-center mt-6">
        {item.title}
      </Text>

      <Text className="text-gray-500 font-Poppins_Regular text-center mt-2 px-4">
        {item.caption}
      </Text>
    </View>
  );
};
