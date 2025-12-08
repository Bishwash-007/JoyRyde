import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthButton from "@/components/auth/authButton";
import Icon from "@/components/customUI/IconNode";
import TextInputField from "@/components/customUI/TextInputField";
import { useRouter } from "expo-router";

const SignInScreen: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [appleLoading, setAppleLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!email.includes("@")) {
      newErrors.email = "Invalid email address";
      hasError = true;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/home");
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
        <Text className="text-3xl font-Poppins_Bold">Welcome Back</Text>
        <Text className="text-gray-500 font-Poppins_Regular mt-1 text-base">
          Login to your account
        </Text>
      </View>

      {/* Form */}
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
        }}
        error={errors.email}
        iconName="Mail"
        loading={loading}
      />
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

      {/* Sign Up Prompt */}
      <View className="flex-row justify-end">
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text className="font-Poppins_Regular text-gray-600">
            Forgot Password ?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          className="mr-2 items-center justify-center"
          onPress={() => setRememberMe(!rememberMe)}
        >
          {rememberMe ? (
            <Icon name={"SquareCheck"} size={20} color={"gray"} />
          ) : (
            <Icon name={"Square"} size={20} color={"gray"} />
          )}
        </TouchableOpacity>
        <Text className="font-Poppins_Regular text-gray-600">Remember Me</Text>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        className={`py-4 rounded-2xl mb-6 flex-row justify-center items-center ${
          loading ? "bg-gray-400" : "bg-black"
        }`}
        disabled={loading}
      >
        {loading && <ActivityIndicator color="#fff" className="mr-2" />}
        <Text className="text-white font-Poppins_SemiBold text-base">
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      {/* Separator */}
      <View className="flex-row items-center justify-center mb-6">
        <View className="bg-gray-300 h-px flex-1" />
        <Text className="px-4 text-gray-400 font-Poppins_Regular">OR</Text>
        <View className="bg-gray-300 h-px flex-1" />
      </View>

      {/* OAuth Buttons */}
      <View className="flex-col justify-between gap-4 mb-6">
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
      </View>

      {/* Sign Up Prompt */}
      <View className="flex-row justify-center">
        <Text className="text-gray-500 font-Poppins_Regular mr-1">
          Don&apos;t have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/sign-up")}>
          <Text className="font-Poppins_SemiBold text-black">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
