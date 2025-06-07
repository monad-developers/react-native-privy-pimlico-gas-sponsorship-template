import { BottomSheetView } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FloatingIconButton from "../ui/FloatingIconButton";
import ThemedButton from "../ui/ThemedButton";

export default function SendSheet() {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");

    const handleChange = (val: string) => {
        // Allow only digits and a single dot
        let sanitized = val.replace(/[^0-9.]/g, "");
        // Only allow one decimal point
        const parts = sanitized.split(".");
        if (parts.length > 2) {
            sanitized = parts[0] + "." + parts.slice(1).join("");
        }

        setAmount(sanitized);
    };

    return (
        <BottomSheetView style={styles.bottomSheetView}>
            <View style={styles.flexContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Send USDC</Text>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputRow}>
                            <Text style={styles.dollarSign}>$</Text>
                            <TextInput
                                style={styles.input}
                                value={amount}
                                onChangeText={handleChange}
                                placeholder="0.00"
                                placeholderTextColor="#bbb"
                                keyboardType="numeric"
                                maxLength={12}
                                selectionColor="transparent"
                            />
                        </View>
                    </View>
                    <View style={styles.addressInputWrapper}>
                        <Text style={styles.label}>Receiver</Text>
                        <View style={styles.addressFloatContainer}>
                            <TextInput
                                style={styles.addressInput}
                                value={address}
                                onChangeText={setAddress}
                                placeholder="Receiver address"
                                placeholderTextColor="#bbb"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                textContentType="none"
                                multiline
                                numberOfLines={2}
                            />
                            {address.length === 0 && (
                                <FloatingIconButton
                                    icon="doc.on.clipboard"
                                    label="Paste"
                                    onPress={async () => {
                                        const text = await Clipboard.getStringAsync();
                                        setAddress(text);
                                    }}
                                    style={styles.pasteButton}
                                    textStyle={{ fontSize: 12 }}
                                    iconSize={14}
                                />
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.bottomButtonWrapper}>
                    <ThemedButton
                        title="Send"
                        onPress={() => {/* handle send */}}
                        disabled={!(amount && address)}
                    />
                </View>
            </View>
        </BottomSheetView>
    );
}

const styles = StyleSheet.create({
    bottomSheetView: {
        height: "100%",
    },
    flexContainer: {
        height: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 40,
    },
    title: {
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Semibold",
        color: "#555",
        marginBottom: 40,
    },
    inputWrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    addressInputWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        minHeight: 100,
        marginTop: 60,
    },
    addressFloatContainer: {
        position: "relative",
        width: "100%",
        justifyContent: "center",
    },
    pasteButton: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }], // half of button height (48)
        height: 24,
        width: 70,
        zIndex: 2,
        fontSize: 12,
    },
    dollarSign: {
        fontSize: 28,
        color: "#222",
        marginRight: 8,
        fontFamily: "SF-Pro-Rounded-Semibold",
    },
    input: {
        fontSize: 64,
        fontFamily: "SF-Pro-Rounded-Bold",
        color: "#222", // Hide the text input text
        backgroundColor: "transparent",
        borderWidth: 0,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        color: "#555",
        fontFamily: "SF-Pro-Rounded-Semibold",
        marginBottom: 10,
    },
    addressInput: {
        fontSize: 20,
        backgroundColor: "transparent",
        fontFamily: "SF-Pro-Rounded-Semibold", // fallback monospace
        color: "#222",
        minHeight: 48,
        textAlignVertical: "top",
    },
    inputRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
    },
    bottomButtonWrapper: {
        paddingBottom: 32,
        padding: 24,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
