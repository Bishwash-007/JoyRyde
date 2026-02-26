import { View, Text, ScrollView, FlatList, TextInput } from 'react-native';
import React from 'react';
import Icon from '@/components/ui/IconNode';
import CustomButton from '@/components/auth/CustomButton';

const SearchScreen = () => {
  return (
    <FlatList
      className="bg-background flex-1 px-6 pt-12"
      data={null}
      ListHeaderComponent={() => {
        return (
          <View>
            {/* Header Types  */}
            <View className="flex flex-row justify-between items-center ml-0">
              <Icon name="X" size={24} color="white" />
              <Text className="text-text font-Bold text-2xl">
                Let&apos;s Travel Together
              </Text>
              <View style={{ width: 20 }} />
            </View>

            <View className="flex flex-col items-start gap-2 justify-between px-6 py-6 border-borderMuted border rounded-sm">
              {/* search inputs  */}
              <View className="w-full flex-row items-center bg-foreground rounded-sm px-4 py-2">
                <Icon name="MapPin" size={24} color="#ffffff" />
                <TextInput
                  className="bg-foreground h-12 px-4 rounded-sm"
                  placeholder="Search for places..."
                />
              </View>
              <View className="w-full flex-row items-center bg-foreground rounded-sm px-4 py-2">
                <Icon name="MapPin" size={24} color="#ffffff" />
                <TextInput
                  className="bg-foreground h-12 px-4 rounded-sm"
                  placeholder="Search for activities..."
                />
              </View>

              <View className="flex flex-row justify-between">
                <View>
                  <Text className="text-text">Select Date</Text>
                  <Select />
                </View>
                <View>
                  <Text className="text-text">Passenger(s)</Text>
                  <Select />
                </View>
              </View>

              <CustomButton
                title="find a ride"
                onPress={() => {}}
                variant="secondary"
              />
            </View>
          </View>
        );
      }}
      renderItem={() => <></>}
    />
  );
};

export default SearchScreen;

const Select = () => {
  return (
    <View className="w-full flex-row items-center bg-foreground rounded-sm px-4 py-2">
      <TextInput
        className="bg-foreground h-12 px-4 rounded-sm"
        placeholder="Select date..."
        placeholderTextColor={'white'}
      />
      <Icon name="Calendar" size={18} color="#ffffff" />
    </View>
  );
};
