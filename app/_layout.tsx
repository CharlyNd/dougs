import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useCustomFonts } from '~/hooks/useFonts';

export default function Layout() {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack />
    </View>
  );
}
