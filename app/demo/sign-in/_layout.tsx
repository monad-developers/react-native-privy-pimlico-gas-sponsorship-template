import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function SignInLayout() {
    return (
        <AuthProvider>
            <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: 20 }}>
                <Slot />
            </View>
        </AuthProvider>
    );
}
