import AuthButton from '@/components/auth/authButton';
import CustomButton from '@/components/auth/CustomButton';
import Icon from '@/components/ui/IconNode';
import TextInputField from '@/components/ui/TextInputField';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SignInScreen: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const storeLoading = useAuthStore((s) => s.loading);
  const storeError = useAuthStore((s) => s.error);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [appleLoading, setAppleLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!email.includes('@')) {
      newErrors.email = 'Invalid email address';
      hasError = true;
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      try {
        await login({ email, password });
        router.push('/home');
      } catch (err) {
        setErrors((prev) => ({ ...prev, password: 'Invalid credentials' }));
      }
    }
  };

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (storeLoading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
    } else {
      rotation.value = 0;
    }
  }, [storeLoading, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background px-6 pt-36"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back Button */}
      {/* <TouchableOpacity
        className="absolute top-24 left-6 flex-row items-center"
        onPress={() => router.back()}
      >
        <Icon name="ArrowLeft" size={20} color="#6B7280" />
      </TouchableOpacity> */}

      {/* Heading */}
      <View className="mb-8">
        <Text className="text-3xl font-Bold text-text">Welcome Back</Text>
        <Text className="text-textMuted font-Regular mt-1 text-base">
          Login to your account
        </Text>
      </View>
      {/* Form */}
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
        }}
        error={errors.email}
        iconName="Mail"
        loading={storeLoading}
      />
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
        loading={storeLoading}
      />

      {/* Sign Up Prompt */}
      <View className="flex-row justify-end">
        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text className="font-Regular text-text">Forgot Password ?</Text>
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          className="mr-2 items-center justify-center"
          onPress={() => setRememberMe(!rememberMe)}
        >
          {rememberMe ? (
            <Icon name={'SquareCheck'} size={20} color={'gray'} />
          ) : (
            <Icon name={'Square'} size={20} color={'gray'} />
          )}
        </TouchableOpacity>
        <Text className="font-Regular text-textMuted">Remember Me</Text>
      </View>

      {/* Sign In Button */}
      {storeError && (
        <Text className="text-error text-center mb-2">{storeError}</Text>
      )}
      <CustomButton
        title="Sign In"
        onPress={handleSignIn}
        loading={storeLoading}
      />

      {/* Separator */}
      <View className="flex-row items-center justify-center mb-6">
        <View className="bg-borderMuted h-px flex-1" />
        <Text className="px-4 text-textMuted font-Regular">OR</Text>
        <View className="bg-borderMuted h-px flex-1" />
      </View>

      {/* OAuth Buttons */}
      <View className="flex-col justify-between gap-4 mb-6">
        <AuthButton
          title="Continue with Google"
          icon={require('@/assets/icons/google.png')}
          loading={googleLoading}
          onPress={() => {
            setGoogleLoading(true);
            setTimeout(() => setGoogleLoading(false), 2000);
          }}
        />
        <AuthButton
          title="Continue with Apple"
          icon={require('@/assets/icons/apple.png')}
          loading={appleLoading}
          onPress={() => {
            setAppleLoading(true);
            setTimeout(() => setAppleLoading(false), 2000);
          }}
        />
      </View>

      {/* Sign Up Prompt */}
      <View className="flex-row justify-center">
        <Text className="text-textMuted font-Regular mr-1">
          Don&apos;t have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text className="font-SemiBold text-text">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
