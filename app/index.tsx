import ErrorScreen from "@/components/ui/ErrorScreen";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import SmartWalletProvider from "@/hooks/useSmartWallet";
import HomeScreen from "@/screens/Home";
import { AuthBoundary } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthBoundary
        loading={<FullScreenLoader />}
        error={(error) => <ErrorScreen error={error} />}
        unauthenticated={<Redirect href="/sign-in" />}
      >
        <SmartWalletProvider>
          <View style={{ flex: 1 }}>
            <HomeScreen />
          </View>
          <PrivyElements />
        </SmartWalletProvider>
      </AuthBoundary>
    </GestureHandlerRootView>
  );
}
