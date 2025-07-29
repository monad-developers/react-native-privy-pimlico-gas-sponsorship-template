import SmartWalletProvider from "@/hooks/useSmartWallet";
import HomeScreen from "@/screen/HomeScreen";

export default function Index() {
  return (
    <SmartWalletProvider>
        <HomeScreen />
    </SmartWalletProvider>
  );
}
