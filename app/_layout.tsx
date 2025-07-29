import { PrivyProvider } from "@privy-io/expo";
import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { monadTestnet } from "viem/chains";

export default function DemoLayout() {
  const hasAppId = !!process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const hasClientId = !!process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;
  const hasBundlerUrl = !!process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL;
  const hasEnvVars = hasAppId && hasClientId && hasBundlerUrl;
  
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

  if (
    process.env.EXPO_PUBLIC_PRIVY_APP_ID &&
    process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID
  ) {
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

  return (
    <View style={styles.container}>
      <Text>EXPO_PUBLIC_PRIVY_APP_ID is not set in .env file</Text>
      <Text>EXPO_PUBLIC_PRIVY_CLIENT_ID is not set in .env file</Text>
    </View>
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
