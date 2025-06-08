import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { monadTestnet } from "viem/chains";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        "SF-Pro-Rounded-Black": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Black.otf"),
        "SF-Pro-Rounded-Bold": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Bold.otf"),
        "SF-Pro-Rounded-Heavy": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Heavy.otf"),
        "SF-Pro-Rounded-Medium": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Medium.otf"),
        "SF-Pro-Rounded-Regular": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Regular.otf"),
        "SF-Pro-Rounded-Semibold": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Semibold.otf"),
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            {process.env.EXPO_PUBLIC_PRIVY_APP_ID &&
            process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID ? (
                <PrivyProvider
                    clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}
                    appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID}
                    supportedChains={[monadTestnet]}
                    config={{
                        embedded: {
                            ethereum: {
                                createOnLogin: "users-without-wallets",
                            },
                        },
                    }}
                >
                    <Slot />
                    <PrivyElements />
                </PrivyProvider>
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text>PRIVY_APP_ID is not set</Text>
                </View>
            )}
        </ThemeProvider>
    );
}
