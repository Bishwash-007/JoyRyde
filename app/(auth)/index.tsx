import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AuthButton from "@/components/auth/authButton";
import PolicyModal from "@/components/auth/PolicyModal";
import { privacyText, termsText } from "@/constants/PolicyData";

const GetStarted: React.FC = () => {
  const router = useRouter();
  const [appleLoading, setAppleLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  const handleSignIn = () => {
    router.push("/(auth)/sign-in");
  };
  const handleSignUp = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <View className="flex-1 bg-white relative justify-center items-center px-6">
      {/* Logo */}
      <View className="mt-32 mb-6">
        <Image
          source={require("@/assets/icons/icon.png")}
          resizeMode="cover"
          className="w-48 h-48 rounded-2xl"
        />
      </View>

      {/* Heading */}
      <View className="items-center mb-12">
        <Text className="text-3xl font-Poppins_Bold text-center">
          Let&apos;s Get Started!
        </Text>
        <Text className="text-gray-500 text-base font-Poppins_Regular mt-2 text-center">
          Let&apos;s dive into your account
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-1 flex-col gap-4">
        <AuthButton
          title="Continue with Google"
          icon={require("@/assets/icons/google.png")}
          loading={googleLoading}
          onPress={() => {
            setGoogleLoading(true);
            setTimeout(() => setGoogleLoading(false), 2000);
          }}
        />

        <AuthButton
          title="Continue with Apple"
          icon={require("@/assets/icons/apple.png")}
          loading={appleLoading}
          onPress={() => {
            setAppleLoading(true);
            setTimeout(() => setAppleLoading(false), 2000);
          }}
        />

        {/* Sign In / Create Account */}
        <View className="mt-6 flex-col items-center gap-4">
          <TouchableOpacity activeOpacity={0.7} onPress={handleSignIn}>
            <Text className="text-center font-Poppins_Regular text-base">
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={handleSignUp}>
            <Text className="text-center font-Poppins_Regular text-base">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View className="absolute bottom-6 flex-row justify-center gap-6">
        <TouchableOpacity
          onPress={() => setPrivacyVisible(true)}
          activeOpacity={0.7}
        >
          <Text className="text-sm font-Poppins_ExtraLight text-gray-400">
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTermsVisible(true)}
          activeOpacity={0.7}
        >
          <Text className="text-sm font-Poppins_ExtraLight text-gray-400">
            Terms of Service
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <PolicyModal
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
        title="Privacy Policy"
        content={privacyText}
      />

      <PolicyModal
        visible={termsVisible}
        onClose={() => setTermsVisible(false)}
        title="Terms of Service"
        content={termsText}
      />
    </View>
  );
};

export default GetStarted;
