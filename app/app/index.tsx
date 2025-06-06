import ThemedButton from "@/components/ui/ThemedButton";
import { usePrivy } from "@privy-io/expo";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
    const { logout, user } = usePrivy();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text style={{ fontSize: 28, fontWeight: "bold", fontFamily: "SF-Pro-Rounded-Semibold" }}>
                Welcome to the app!
            </Text>
            <View style={{ height: 24 }} />
            <ThemedButton
                title="Log Out"
                onPress={logout}
            />
        </View>
    );
}
