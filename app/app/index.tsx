import { usePrivy } from "@privy-io/expo";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
    const { logout, user } = usePrivy();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                Welcome to the app!
            </Text>
            <View style={{ height: 24 }} />
            <Text onPress={logout} style={{ color: '#007AFF', fontSize: 18, padding: 10 }}>
                Log Out
            </Text>
        </View>
    );
}
