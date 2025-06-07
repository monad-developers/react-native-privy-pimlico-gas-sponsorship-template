import ReceiveSheet from "@/components/sheets/ReceiveSheet";
import SendSheet from "@/components/sheets/SendSheet";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { usePrivy } from "@privy-io/expo";
import React, { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
    const { logout, user } = usePrivy();

    const { linked_accounts } = user as any;
    const email = linked_accounts?.find(
        (account: any) => account.type === "email"
    )?.email;
    
    // Bottom sheet ref and snap points
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = ["90%"];
    const [sheetType, setSheetType] = useState<"send" | "receive" | null>(null);

    const openSheet = useCallback((type: "send" | "receive") => {
        setSheetType(type);
        bottomSheetRef.current?.expand();
    }, []);

    const handleClose = useCallback(() => {
        setSheetType(null);
        bottomSheetRef.current?.close();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 100,
            }}
        >
            <Avatar
                seed={email || "user"}
                size={96}
                style={{ marginBottom: 24 }}
            />
            <Text
                style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    fontFamily: "SF-Pro-Rounded-Semibold",
                }}
            >
                $1,000.00
            </Text>
            <View
                style={{
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 30,
                    paddingHorizontal: 30,
                    gap: 10,
                }}
            >
                <IconButton icon="paperplane.fill" label="Send USDC" onPress={() => openSheet("send")} />
                <IconButton icon="qrcode" label="Receive" onPress={() => openSheet("receive")} />
                <IconButton icon="signature" label="Sign Message" onPress={() => {}} />
                <IconButton icon="square.and.arrow.up.trianglebadge.exclamationmark" label="Export Wallet" onPress={() => {}} /><IconButton icon="square.and.arrow.up.trianglebadge.exclamationmark" label="Sign Out" onPress={logout} />
            </View>
            <View style={{ height: 24 }} />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                handleStyle={{ display: "none" }}
                backgroundStyle={{ backgroundColor: "#fff" }}
                backdropComponent={BottomSheetBackdrop}
                onClose={handleClose}
            >
                {sheetType === "send" && <SendSheet />}
                {sheetType === "receive" && <ReceiveSheet />}
            </BottomSheet>
        </View>
    );
}
