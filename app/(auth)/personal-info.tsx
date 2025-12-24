import CustomButton from "@/components/auth/CustomButton";
import Icon from "@/components/ui/IconNode";
import TextInputField from "@/components/ui/TextInputField";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PersonalDetails: React.FC = () => {
  const { email } = useLocalSearchParams();
  const safeEmail = Array.isArray(email) ? email[0] : email ?? "";
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
  });

  const handleSave = () => {
    let hasError = false;
    const newErrors = { ...errors };

    if (!fullName) {
      newErrors.fullName = "Full name is required";
      hasError = true;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      newErrors.phoneNumber = "Enter a valid phone number";
      hasError = true;
    }

    if (!dob) {
      newErrors.dob = "Date of birth is required";
      hasError = true;
    }

    if (!address) {
      newErrors.address = "Address is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log({
          fullName,
          phoneNumber,
          dob,
          address,
          email: safeEmail,
        });
        router.push("/home");
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                error={errors.fullName}
                iconName="User"
              />
            </View>

            {/* Phone Number */}
            <View>
              <Text className="text-textMuted font-Regular mb-2">
                Phone Number
              </Text>
              <TextInputField
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  if (errors.phoneNumber)
                    setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }}
                error={errors.phoneNumber}
                iconName="Flag"
                keyboardType="phone-pad"
              />
            </View>

            {/* Address */}

            <View className="mb-6">
              <Text className="text-textMuted font-Regular mb-2">Address</Text>
              <TextInputField
                placeholder="Address"
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  if (errors.address)
                    setErrors((prev) => ({ ...prev, address: "" }));
                }}
                error={errors.address}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Save Button */}
            <CustomButton title="Save" onPress={handleSave} loading={loading} />
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
