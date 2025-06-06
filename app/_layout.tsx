import { PrivyProvider } from '@privy-io/expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import { Slot } from 'expo-router';
import { Text, View } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     {
      process.env.EXPO_PUBLIC_PRIVY_APP_ID && process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID ? (
        <PrivyProvider clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID} appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID}>
          <Slot />
        </PrivyProvider>
      ) : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PRIVY_APP_ID is not set</Text>
    </View>
     }
    </ThemeProvider>
  );
}
