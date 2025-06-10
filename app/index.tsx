import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ui/ThemedButton";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TemplateInfo() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.headerImageContainer}>
                <Image
                    source={require("@/assets/images/monad-logo-inverted.png")}
                    style={styles.headerImage}
                />
            </View>
            <ScrollView
                contentContainerStyle={[styles.contentContainer, { alignItems: "flex-start", padding: 20, gap: 10, paddingBottom: 120 }]}
                showsVerticalScrollIndicator={false}
            >
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">
                        Monad React Native Wallet Demo
                    </ThemedText>
                </ThemedView>
                <Collapsible title="Environment Variables">
                    <View style={styles.collapsibleContentContainer}>
                        <ThemedText>
                            The template uses environment variables to configure
                            the wallet.
                        </ThemedText>
                        <ThemedText>
                            Create a copy of <ThemedText type="defaultSemiBold">.env.example</ThemedText> and rename it to <ThemedText type="defaultSemiBold">.env</ThemedText>
                        </ThemedText>
                        <ThemedText>
                            Add the following variables:
                        </ThemedText>
                        <ThemedText type="defaultSemiBold">
                            EXPO_PUBLIC_PRIVY_APP_ID
                        </ThemedText>
                        <ThemedText type="defaultSemiBold">
                            EXPO_PUBLIC_PRIVY_CLIENT_ID
                        </ThemedText>
                    </View>
                </Collapsible>
                <Collapsible title="Wallet Creation">
                    <View style={styles.collapsibleContentContainer}>
                        <ThemedText>
                            This demo uses email to create a wallet, make sure
                            to have email enabled as a login method in your
                            Privy dashboard.
                        </ThemedText>
                        <ThemedText>
                            You can use Privy test accounts during development.
                        </ThemedText>
                    </View>
                </Collapsible>
                <Collapsible title="UI Components">
                    <View style={styles.collapsibleContentContainer}>
                        <ThemedText>
                            The template includes UI components in the <ThemedText type="defaultSemiBold">/components/ui</ThemedText> directory.
                        </ThemedText>
                        <ThemedText>
                            The bottom sheets for send, receive and sign messages is available in the <ThemedText type="defaultSemiBold">/components/ui/sheets</ThemedText> directory.
                        </ThemedText>
                        <ThemedText>
                            The fonts are in <ThemedText type="defaultSemiBold">/assets/fonts</ThemedText> directory.
                        </ThemedText>
                    </View>
                </Collapsible>
                <Collapsible title="Reset Project">
                    <View style={styles.collapsibleContentContainer}>
                        <ThemedText>
                            You can use the script in the scripts folder to
                            reset the project to a blank state.
                        </ThemedText>
                        <ThemedText>
                            This will remove the Privy specific code as well!
                        </ThemedText>
                        <ThemedText type="defaultSemiBold">
                            npm run reset-project
                        </ThemedText>
                    </View>
                </Collapsible>
            </ScrollView>
            <View style={[
                styles.buttonContainer,
                {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 20,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                },
            ]}>
                <ThemedButton
                    title="Check out the demo"
                    style={{ width: "100%" }}
                    onPress={() => router.push("/demo/app")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
    },
    headerImageContainer: {
        display: "flex",
        width: "100%",
        height: 250,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    headerImage: {
        width: 200,
        height: 200,
        marginTop: 50,
        resizeMode: "contain",
    },
    contentContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        gap: 10,
    },
    collapsibleContentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 10,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        marginBottom: 16,
        width: "100%",
        padding: 20,
        alignItems: "center",
    },
});
