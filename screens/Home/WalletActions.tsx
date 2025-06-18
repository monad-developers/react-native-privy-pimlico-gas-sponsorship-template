import IconButton from "@/components/ui/IconButton";
import { usePrivy } from "@privy-io/expo";
import { View } from "react-native";

export default function WalletActions({
  openSheet,
}: {
  openSheet: (type: "send" | "receive" | "sign") => void;
}) {
  const { logout } = usePrivy();
  return (
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
      <IconButton
        icon="paperplane.fill"
        label="Send USDC"
        onPress={() => openSheet("send")}
      />
      <IconButton
        icon="qrcode"
        label="Receive"
        onPress={() => openSheet("receive")}
      />
      <IconButton
        icon="signature"
        label="Sign Message"
        onPress={() => openSheet("sign")}
      />
      <IconButton
        icon="rectangle.portrait.and.arrow.forward"
        label="Sign Out"
        onPress={logout}
      />
    </View>
  );
}
