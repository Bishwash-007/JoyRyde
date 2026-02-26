import Icon from '@/components/ui/IconNode';
import { useRouter } from 'expo-router';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

const settingsData = [
  {
    id: '1',
    title: 'Account',
    description: 'Manage your account settings',
    Icon: 'User',
  },
  {
    id: '2',
    title: 'Notifications',
    description: 'Notification preferences',
    Icon: 'Bell',
  },
  {
    id: '3',
    title: 'Privacy',
    description: 'Privacy and security settings',
    Icon: 'Shield',
  },
  {
    id: '4',
    title: 'Help',
    description: 'Get support and help',
    Icon: 'HeartHandshake',
  },
];

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-background px-6 h-full pt-12">
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-4 border-b border-gray-300 flex-row items-center"
            onPress={() =>
              router.push({
                pathname: '/settings',
                params: { title: item.title },
              })
            }
          >
            <Icon name={item.Icon} size={24} color="#555555" />
            <Text className="text-text text-lg font-semibold ml-4">
              {item.title}
            </Text>
            <View className="ml-auto">
              <Icon name="ChevronRight" size={24} color="#555555" />
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => {
          return (
            <View>
              <View></View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProfileScreen;
