import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "@/components/customUI/IconNode";
import TextInputField from "@/components/customUI/TextInputField";
import { useRouter } from "expo-router";

const SetUpPassword: React.FC = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const handleSave = () => {
    let hasError = false;
    const newErrors = { password: "", confirmPassword: "" };

    // Password validations
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    // Confirm password validations
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      hasError = true;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log({ password, confirmPassword });
        router.push("/personal-info");
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-6 pt-36"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-24 left-6 flex-row items-center"
        onPress={() => router.back()}
      >
        <Icon name="ArrowLeft" size={20} color="#6B7280" />
      </TouchableOpacity>

      {/* Heading */}
      <View className="mb-8">
        <Text className="text-3xl font-Poppins_Bold">Setup Password</Text>
        <Text className="text-gray-500 font-Poppins_Regular mt-1 text-base">
          Keep a strong password
        </Text>
      </View>

      {/* Password */}
      <TextInputField
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
        }}
        secure
        error={errors.password}
        iconName="Lock"
        loading={loading}
      />

      {/* Confirm Password */}
      <TextInputField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (errors.confirmPassword)
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }}
        secure
        error={errors.confirmPassword}
        iconName="Lock"
        loading={loading}
      />

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className={`py-4 rounded-2xl mb-6 flex-row justify-center items-center ${
          loading ? "bg-gray-400" : "bg-black"
        }`}
        disabled={loading}
      >
        {loading && <ActivityIndicator color="#fff" className="mr-2" />}
        <Text className="text-white font-Poppins_SemiBold text-base">
          {loading ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SetUpPassword;
