import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import { createContext, useContext, useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, PublicClient, WalletClient } from "viem";
import { monadTestnet } from "viem/chains";

interface WalletContextType {
    address: string | null;
    getUSDCBalance: () => Promise<bigint | undefined>;
    sendUSDC: (to: `0x${string}`, amount: bigint) => Promise<any>;
    signMessage: (message: string) => Promise<string | undefined>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const USDC_ADDRESS = "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea";
const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }
];

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { wallets } = useEmbeddedEthereumWallet();
    const wallet = wallets[0];
    const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
    const [publicClient, setPublicClient] = useState<PublicClient | null>(null);

    useEffect(() => {
        async function init() {
            if (wallet) {
                const provider = await wallet.getProvider();
                const publicClient = createPublicClient({
                    chain: monadTestnet,
                    transport: custom(provider),
                });
                const walletClient = createWalletClient({
                    account: wallet.address as `0x${string}`,
                    chain: monadTestnet,
                    transport: custom(provider),
                });
                setWalletClient(walletClient);
                setPublicClient(publicClient);
            }
        }
        init();
        return () => {
            setWalletClient(null);
            setPublicClient(null);
        };
    }, [wallet]);

    async function getUSDCBalance() {
        if (publicClient && wallet) {
            const balance = await publicClient.readContract({
                address: USDC_ADDRESS,
                abi: ERC20_ABI,
                functionName: "balanceOf",
                args: [wallet.address as `0x${string}`],
            });
            return balance as bigint;
        }
    }

    async function sendUSDC(to: `0x${string}`, amount: bigint) {
        if (walletClient && wallet) {
            const usdcAddress = "0x0000000000000000000000000000000000000000";
            const tx = await walletClient.sendTransaction({
                account: wallet.address as `0x${string}`,
                to: to,
                value: 0n,
                data: "0x",
                chain: monadTestnet,
            });
            return tx;
        }
    }

    async function signMessage(message: string) {
        if (walletClient && wallet) {
            const signature = await walletClient.signMessage({
                account: wallet.address as `0x${string}`,
                message,
            });
            return signature;
        }
    }

    return (
        <WalletContext.Provider
            value={{
                address: wallet?.address ?? null,
                getUSDCBalance,
                sendUSDC,
                signMessage,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWalletContext() {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWalletContext must be used within a WalletProvider");
    return ctx;
}