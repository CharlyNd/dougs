import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { OperationList } from '~/components/operation-list/OperationList';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-white">
        <OperationList />
      </SafeAreaView>
    </>
  );
}
