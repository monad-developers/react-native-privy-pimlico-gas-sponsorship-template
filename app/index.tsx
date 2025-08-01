import SmartWalletProvider from "@/hooks/useSmartWallet";
import Home from "@/screens/Home";

export default function Index() {
  return (
    <SmartWalletProvider>
        <Home />
    </SmartWalletProvider>
  );
}
