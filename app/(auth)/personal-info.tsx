import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import TextInputField from "@/components/customUI/TextInputField";
import Icon from "@/components/customUI/IconNode";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white pt-12"
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
            <Text className="text-3xl font-Poppins_Bold mb-8 mt-16 text-center">
              Fill Personal Info
            </Text>

            {/* Profile Picture */}
            <TouchableOpacity className="w-24 h-24 rounded-full bg-gray-200 mb-8 items-center justify-center self-center">
              <Icon name="Camera" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Full Name */}
            <View>
              <Text className="text-gray-600 font-Poppins_Regular mb-2">
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

            {/* Email (disabled) */}
            <View>
              <Text className="text-gray-600 font-Poppins_Regular mb-2">
                Email
              </Text>
              <TextInputField
                placeholder="Email"
                value={safeEmail}
                onChangeText={() => {}}
                editable={false}
                iconName="Mail"
              />
            </View>

            {/* Phone Number */}
            <View>
              <Text className="text-gray-600 font-Poppins_Regular mb-2">
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

            {/* Date of Birth */}
            <View className="mb-4">
              <Text className="text-gray-600 font-Poppins_Regular mb-2">
                Date of Birth
              </Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-2xl px-4 py-3 flex-row items-center justify-between"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className={dob ? "text-gray-900" : "text-gray-400"}>
                  {dob ? dob.toLocaleDateString() : "Select Date"}
                </Text>
                <Icon name="Calendar" size={20} color="#6B7280" />
              </TouchableOpacity>
              {errors.dob && (
                <Text className="text-red-500 mt-1 font-Poppins_Regular text-sm">
                  {errors.dob}
                </Text>
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={dob || new Date(2000, 0, 1)}
                  mode="date"
                  maximumDate={new Date()}
                  themeVariant="light"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDob(selectedDate);
                      if (errors.dob)
                        setErrors((prev) => ({ ...prev, dob: "" }));
                    }
                  }}
                />
              )}
            </View>

            {/* Address */}

            <View>
              <Text className="text-gray-600 font-Poppins_Regular mb-2">
                Address
              </Text>
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
            <TouchableOpacity
              onPress={handleSave}
              disabled={loading}
              className={`py-4 rounded-2xl mt-6 flex-row justify-center items-center ${
                loading ? "bg-gray-400" : "bg-black"
              }`}
            >
              {loading && <ActivityIndicator color="#fff" className="mr-2" />}
              <Text className="text-white font-Poppins_SemiBold text-base">
                {loading ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
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
