import '../global.css';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import Colors from '~/constants/Colors';
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
            headerTitle: props => (
              <View style={{ flex: 1, justifyContent: "center", height: 50 }}>
                <Text
                  className='font-semibold text-xl w-5/6 text-left'
                  style={{
                    color: Colors.labelOperation.date,
                    flexWrap: 'wrap',
                    flexShrink: 1
                  }}
                  numberOfLines={2}
                >
                  {props.children}
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="operation/categoryScreen"
          options={{
            headerShown: true,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: '#000000',
            headerShadowVisible: false,
            headerTitle: props => (
              <View style={{ flex: 1, justifyContent: "center", height: 50 }}>
                <Text className=' font-semibold text-xl' style={{ color: Colors.labelOperation.date }} >
                  Catégories
                </Text>
              </View>
            ),
          }}
        />
      </Stack>
    </View>
  );
}
