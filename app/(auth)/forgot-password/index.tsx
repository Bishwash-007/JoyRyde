import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TextInputField from "@/components/customUI/TextInputField";
import Icon from "@/components/customUI/IconNode";
import { useRouter } from "expo-router";

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email: string }>({ email: "" });

  const handleSendCode = () => {
    let hasError = false;
    const newErrors = { email: "" };

    if (!email.includes("@")) {
      newErrors.email = "Invalid email address";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push({
          pathname: "/verification",
          params: { email },
        });
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
        onPress={() => router.back()}
        className="absolute top-24 left-6 flex-row items-center"
      >
        <Icon name="ArrowLeft" size={20} color="#6B7280" />
      </TouchableOpacity>

      {/* Heading */}
      <View className="mb-6">
        <Text className="text-3xl font-Poppins_Bold">Forgot Password?</Text>
        <Text className="text-gray-500 font-Poppins_Regular mt-1 text-base">
          We&apos;ll send an OTP code to your email to help you reset your
          password
        </Text>
      </View>

      {/* Email Field */}
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ email: "" });
        }}
        error={errors.email}
        iconName="Mail"
        loading={loading}
      />

      {/* Send Code Button */}
      <TouchableOpacity
        onPress={handleSendCode}
        disabled={loading}
        className={`py-4 rounded-2xl mb-6 flex-row justify-center items-center ${
          loading ? "bg-gray-500" : "bg-black"
        }`}
      >
        {loading && <ActivityIndicator color="#fff" className="mr-2" />}
        <Text className="text-white font-Poppins_SemiBold text-base">
          {loading ? "Sending..." : "Send Code"}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Prompt */}
      <View className="flex-row justify-center">
        <Text className="text-gray-500 font-Poppins_Regular mr-1">
          Remember Password?
        </Text>
        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text className="font-Poppins_SemiBold text-black">Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
