import ErrorScreen from "@/components/ui/ErrorScreen";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { AuthBoundary } from "@privy-io/expo";
import { Redirect, Slot } from "expo-router";
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
            <View style={{ flex: 1}}>
                <Slot />
            </View>
        </AuthBoundary>
        </GestureHandlerRootView>
    );
}
