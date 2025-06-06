import ErrorScreen from "@/components/ui/ErrorScreen";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { AuthBoundary } from "@privy-io/expo";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AppLayout() {
    return (
        <AuthBoundary
            loading={<FullScreenLoader />}
            error={(error) => <ErrorScreen error={error} />}
            unauthenticated={<Redirect href="/sign-in" />}
        >
            <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: 20 }}>
                <Slot />
            </View>
        </AuthBoundary>
    );
}
