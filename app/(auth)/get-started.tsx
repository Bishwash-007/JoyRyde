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

  return (
    <View className="w-full h-full bg-white px-6 pt-24 pb-12 justify-start relative items-center">
      {/* Top Section */}
      <View className="items-center">
        {/* Logo */}
        <Image
          source={require("@/assets/icons/icon.png")}
          resizeMode="cover"
          className="w-40 h-40 rounded-2xl mb-8"
        />

        {/* Heading */}
        <Text className="text-3xl font-Poppins_Bold text-center">
          Let&apos;s Get Started!
        </Text>
        <Text className="text-gray-500 text-base font-Poppins_Regular mt-2 text-center">
          Let&apos;s dive into your account
        </Text>
      </View>

      {/* Buttons */}
      <View className="gap-4 mt-10 w-full flex flex-col items-center">
        <AuthButton
          title="Continue with Email"
          icon={require("@/assets/icons/email.png")}
          onPress={() => router.push("/sign-in")}
        />
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
        <View className="mt-4 flex-col items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text className="text-center font-Poppins_Regular text-base">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row justify-center items-center gap-6 mt-12 absolute bottom-6">
        <TouchableOpacity onPress={() => setPrivacyVisible(true)}>
          <Text className="text-sm font-Poppins_ExtraLight text-gray-400">
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTermsVisible(true)}>
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
