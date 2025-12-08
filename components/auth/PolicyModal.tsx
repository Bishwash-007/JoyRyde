import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";

interface PolicyModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const { height } = Dimensions.get("window");

const PolicyModal: React.FC<PolicyModalProps> = ({
  visible,
  onClose,
  title,
  content,
}) => {
  const data = content.split("\n");

  const renderItem = ({ item }: { item: string }) => (
    <Text
      className={`text-gray-700 text-base font-Poppins_Regular ${
        item.startsWith("###") ? "mt-4 font-Poppins_Bold text-lg" : "mt-2"
      }`}
    >
      {item.replace("###", "")}
    </Text>
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={{ margin: 0, justifyContent: "flex-end" }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe={true}
      swipeThreshold={50}
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}
      backdropColor="#000"
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
    >
      <View
        className="bg-white rounded-t-3xl shadow-xl p-6"
        style={{ height: height * 0.85 }}
      >
        {/* Drag Handle */}
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-Poppins_Bold">{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-gray-500 text-lg">✕</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList Content */}
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </Modal>
  );
};

export default PolicyModal;
