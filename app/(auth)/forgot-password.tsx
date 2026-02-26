import CustomButton from '@/components/auth/CustomButton';
import Icon from '@/components/ui/IconNode';
import TextInputField from '@/components/ui/TextInputField';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email: string }>({ email: '' });

  const handleSendCode = () => {
    let hasError = false;
    const newErrors = { email: '' };

    if (!email.includes('@')) {
      newErrors.email = 'Invalid email address';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push({
          pathname: '/code',
          params: { email },
        });
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background px-6 pt-36"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
        <Text className="text-3xl font-Bold text-text">Forgot Password?</Text>
        <Text className="text-textMuted font-Regular mt-1 text-base">
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
          if (errors.email) setErrors({ email: '' });
        }}
        error={errors.email}
        iconName="Mail"
        loading={loading}
      />

      {/* Send Code Button */}
      <CustomButton
        title="Send Code"
        onPress={handleSendCode}
        loading={loading}
      />

      {/* Sign Up Prompt */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-textMuted font-Regular mr-1">
          Remember Password?
        </Text>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text className="font-SemiBold text-text">Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
