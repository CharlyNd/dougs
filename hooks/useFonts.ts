import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export function useCustomFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'Open Sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    'Open Sans SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    'Open Sans Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'Inter': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return {
    fontsLoaded,
    fontError,
    onLayoutRootView,
  };
} 