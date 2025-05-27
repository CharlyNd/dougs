import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useCustomFonts } from '~/hooks/useFonts';

export default function RootLayout() {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack
      >
        <Stack.Screen name='index' />
        <Stack.Screen
          name="operation/[id]"
          options={{
            headerShown: true,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: '#000000',
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </View>
  );
}
