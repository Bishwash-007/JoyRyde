import CustomButton from '@/components/auth/CustomButton';
import Icon from '@/components/ui/IconNode';
import TextInputField from '@/components/ui/TextInputField';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SetUpPassword: React.FC = () => {
  const router = useRouter();

  const { email, code } = useLocalSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });

  const handleSave = () => {
    let hasError = false;
    const newErrors = { password: '', confirmPassword: '' };

    // Password validations (server requires minimum 8 chars)
    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasError = true;
    }

    // Confirm password validations
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    } else if (confirmPassword.length < 8) {
      newErrors.confirmPassword = 'Password must be at least 8 characters';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log({ password, confirmPassword });
        router.push({
          pathname: '/personal-info',
          params: { password, code, email },
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
        className="absolute top-24 left-6 flex-row items-center"
        onPress={() => router.back()}
      >
        <Icon name="ArrowLeft" size={20} color="#6B7280" />
      </TouchableOpacity>

      {/* Heading */}
      <View className="mb-8">
        <Text className="text-3xl font-Bold text-text">Setup Password</Text>
        <Text className="text-textMuted font-Regular mt-1 text-base">
          Keep a strong password
        </Text>
      </View>

      {/* Password */}
      <TextInputField
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
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
            setErrors((prev) => ({ ...prev, confirmPassword: '' }));
        }}
        secure
        error={errors.confirmPassword}
        iconName="Lock"
        loading={loading}
      />

      {/* Save Button */}
      <CustomButton title="Save" onPress={handleSave} loading={loading} />
    </KeyboardAvoidingView>
  );
};

export default SetUpPassword;
