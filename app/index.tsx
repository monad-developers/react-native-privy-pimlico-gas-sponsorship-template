import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function TemplateInfo() {
    const router = useRouter();
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={styles.headerImage}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Wallet Template Info</ThemedText>
            </ThemedView>
            <Collapsible title="Authentication">
                <ThemedText>
                    The template uses Privy for secure authentication via email. The AuthBoundary component protects routes and manages user sessions.
                </ThemedText>
            </Collapsible>
            <Collapsible title="Wallet Management">
                <ThemedText>
                    Users can create and manage wallets. The template provides hooks and UI for wallet creation, login, and logout.
                </ThemedText>
            </Collapsible>
            <Collapsible title="UI Components">
                <ThemedText>
                    The template includes reusable UI components such as FullScreenLoader, ErrorScreen, and themed views for a consistent look and feel.
                </ThemedText>
            </Collapsible>
            <View style={styles.buttonContainer}>
                <Button title="Check out the template" onPress={() => router.push('/app')} />
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginTop: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
});