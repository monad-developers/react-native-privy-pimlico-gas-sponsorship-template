import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { PrivyProvider } from "@privy-io/expo";
import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { monadTestnet } from "viem/chains";

export default function DemoLayout() {
  const hasAppId = !!process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const hasClientId = !!process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;
  const hasBundlerUrl = !!process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL;
  const hasEnvVars = hasAppId && hasClientId && hasBundlerUrl;

  console.log(process.env.EXPO_PUBLIC_PRIVY_APP_ID);

  if (!hasEnvVars) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>⚠️ Configuration Issue</Text>
          <Text style={styles.errorDetail}>
            EXPO_PUBLIC_PRIVY_APP_ID: {hasAppId ? "✅ Set" : "❌ Missing"}
          </Text>
          <Text style={styles.errorDetail}>
            EXPO_PUBLIC_PRIVY_CLIENT_ID: {hasClientId ? "✅ Set" : "❌ Missing"}
          </Text>
          <Text style={styles.errorDetail}>
            EXPO_PUBLIC_PIMLICO_BUNDLER_URL:{" "}
            {hasClientId ? "✅ Set" : "❌ Missing"}
          </Text>
          <Text style={styles.note}>Please check your .env file</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [loaded] = useFonts({
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
    return null;
  }

  return (
    <PrivyProvider
      clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID as string}
      appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID as string}
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
    </PrivyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 10,
    textAlign: "center",
  },
  errorDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  note: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
});
