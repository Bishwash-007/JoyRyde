import CustomButton from '@/components/auth/CustomButton';
import Icon from '@/components/ui/IconNode';
import TextInputField from '@/components/ui/TextInputField';
import { useAuthStore } from '@/store/useAuthStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PersonalDetails: React.FC = () => {
  const { email, password, code } = useLocalSearchParams();
  const safeEmail = Array.isArray(email) ? email[0] : (email ?? '');
  const safePassword = Array.isArray(password) ? password[0] : (password ?? '');
  const safeCode = Array.isArray(code) ? code[0] : (code ?? '');
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const completeSignup = useAuthStore((s: any) => s.completeSignup);
  const storeLoading = useAuthStore((s) => s.loading);
  const storeError = useAuthStore((s) => s.error);
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    let hasError = false;
    const newErrors = { ...errors };

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
      hasError = true;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Enter a valid phone number';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;
    // Basic client-side checks to avoid server validation 400s
    if (!safePassword || safePassword.length < 8) {
      setError('Password is missing or too short (min 8 chars).');
      return;
    }

    if (!safeCode || safeCode.length !== 6) {
      setError('Verification code missing or invalid.');
      return;
    }

    setLocalLoading(true);
    try {
      await completeSignup({
        email: safeEmail,
        code: safeCode,
        password: safePassword,
        name: fullName,
        phone: phoneNumber,
      });
      router.push({ pathname: '/home', params: { email: safeEmail } });
    } catch (err: any) {
      console.error('completeSignup error:', err);
      // Try to surface useful server validation errors
      let message = 'Failed to register. Please try again.';
      if (err && err.response && err.response.data) {
        const data = err.response.data;
        if (typeof data === 'object') {
          if (data.message) message = String(data.message);
          else message = JSON.stringify(data);
        } else if (typeof data === 'string') {
          message = data;
        }
      } else if (err && err.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background pt-12"
    >
      {/* Back Button */}
      <TouchableOpacity
        className="flex-row items-center absolute top-16 left-6 z-10"
        onPress={() => router.back()}
      >
        <Icon name="ArrowLeft" size={20} color="#6B7280" />
      </TouchableOpacity>

      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
            {/* Heading */}
            <Text className="text-3xl font-Bold mb-8 mt-16 text-center text-text">
              Fill Personal Info
            </Text>

            {/* Full Name */}
            <View>
              <Text className="text-textMuted font-Regular mb-2">
                Full Name
              </Text>
              <TextInputField
                placeholder="Full Name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errors.fullName)
                    setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                error={errors.fullName}
                iconName="User"
              />
            </View>

            {/* Phone Number */}
            <View className="mb-6">
              <Text className="text-textMuted font-Regular mb-2">
                Phone Number
              </Text>
              <TextInputField
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  if (errors.phoneNumber)
                    setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                }}
                error={errors.phoneNumber}
                iconName="Flag"
                keyboardType="phone-pad"
              />
            </View>

            {/* Save Button */}
            {(error || storeError) && (
              <Text className="text-error text-center mb-2">
                {error || storeError}
              </Text>
            )}
            <CustomButton
              title="Save"
              onPress={handleSave}
              loading={localLoading || storeLoading}
            />
          </View>
        }
        className="flex-1"
        renderItem={null}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;
