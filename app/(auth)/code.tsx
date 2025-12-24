import CustomButton from "@/components/auth/CustomButton";
import Icon from "@/components/ui/IconNode";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const OTPScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const safeEmail = Array.isArray(email) ? email[0] : email ?? "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(true);

  const inputs = useRef<(TextInput | null)[]>([]);
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t === 1) {
          setCanResend(true);
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    console.log("Resend OTP");
    setCanResend(false);
    setTimer(90);
  };

  const handleOTPChange = (value: string, index: number) => {
    const updated = [...otp];

    if (/^\d*$/.test(value)) {
      updated[index] = value;
      setOtp(updated);

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (value === "" && index > 0) {
      const updated = [...otp];
      updated[index - 1] = "";
      setOtp(updated);

      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const allFilled = otp.every((d) => d !== "");
    if (!allFilled) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/set-password",
        params: { email },
      });
    }, 2000);
  };

  const maskedEmail = (email: string) => {
    if (!email.includes("@")) return "";
    const [username, domain] = email.split("@");

    if (username.length <= 2) {
      return username[0] + "*****@" + domain;
    }

    return (
      username.substring(0, 2) + "*".repeat(username.length - 2) + "@" + domain
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background px-6 pt-28"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-20 left-6 flex-row items-center"
      >
        <Icon name="ArrowLeft" size={20} color="#6B7280" />
      </TouchableOpacity>

      <View className="mb-8">
        <Text className="text-3xl font-Bold text-text">Enter OTP Code</Text>
        <Text className="text-textMuted font-Regular mt-2 text-base">
          We sent a 6-digit verification code to{" "}
          <Text className="font-SemiBold">{maskedEmail(safeEmail)}</Text>.
        </Text>
      </View>

      <View className="flex-row justify-between mb-10">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace" && handleBackspace(digit, index)
            }
            keyboardType="numeric"
            maxLength={1}
            className="w-12 h-14 rounded-xl border border-primary text-center text-xl font-Bold text-text"
          />
        ))}
      </View>

      <CustomButton
        title="Verify Code"
        onPress={handleVerify}
        loading={loading}
      />

      <View className="flex-row justify-center mt-8 items-center">
        <Text className="text-textMuted font-Regular mr-1">
          Didn&apos;t get a code?
        </Text>

        {canResend ? (
          <View>
            <TouchableOpacity activeOpacity={0.7} onPress={handleResend}>
              <Text className="font-SemiBold text-text">Resend Code</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="font-SemiBold text-textMuted">
            Resend in {timer}s
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;
