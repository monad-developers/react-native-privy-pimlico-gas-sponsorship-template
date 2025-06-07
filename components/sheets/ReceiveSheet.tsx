import { BottomSheetView } from "@gorhom/bottom-sheet";
import { usePrivy } from "@privy-io/expo";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";
import SmallIconButton from "../ui/SmallIconButton";

function shortenAddress(address: string) {
    return address.slice(0, 6) + '...' + address.slice(-4);
}

export default function ReceiveSheet() {
    const { user } = usePrivy();
    const { linked_accounts } = user as any;
    const walletAddress = linked_accounts?.find(
        (account: any) => account.type === "wallet" && account.chain_type === "ethereum"
    )?.address;

    return (
        <BottomSheetView style={styles.bottomSheetView}>
            <View style={styles.flexContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Receive</Text>
                    <View style={styles.qrCodeContainer}>
                        <QRCodeStyled
                            data={walletAddress}
                            style={{ backgroundColor: "white" }}
                            pieceSize={10}
                        />
                    </View>
                    <SmallIconButton
                        icon="doc.on.clipboard"
                        label={shortenAddress(walletAddress)}
                        onPress={async () => {
                            await Clipboard.setStringAsync(walletAddress);
                        }}
                        style={styles.copyButton}
                        textStyle={{ fontSize: 20 }}
                        iconSize={14}
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
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 40,
    },
    title: {
        fontSize: 20,
        fontFamily: "SF-Pro-Rounded-Semibold",
        color: "#555",
        marginBottom: 40,
    },
    qrCodeContainer: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#555",
    },
    copyButton: {
        marginTop: 20,
        height: 40,
        width: "100%",
    },
});
