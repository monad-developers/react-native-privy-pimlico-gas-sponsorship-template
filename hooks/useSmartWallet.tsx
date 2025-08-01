import { ConnectedEthereumWallet, useEmbeddedEthereumWallet, usePrivy } from "@privy-io/expo";
import type { SmartAccountClient } from "permissionless";
import { createSmartAccountClient } from "permissionless";
import { toKernelSmartAccount } from "permissionless/accounts";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import { monadTestnet } from "viem/chains";

interface SmartWalletInterface {
  smartAccountAddress: `0x${string}` | null;
  smartAccountReady: boolean;
  smartAccountClient: SmartAccountClient | null;
}

const SmartWalletContext = createContext<SmartWalletInterface>({
  smartAccountAddress: null,
  smartAccountReady: false,
  smartAccountClient: null,
});

export const useSmartWallet = () => {
  return useContext(SmartWalletContext);
};

export default function SmartWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    `0x${string}` | null
  >(null);
  const [smartAccountReady, setSmartAccountReady] = useState(false);
  const [smartAccountClient, setSmartAccountClient] =
    useState<SmartAccountClient | null>(null);

  const embeddedWallet = wallets.find((wallet) => wallet.walletIndex === 0);

  useEffect(() => {
    if (!isReady) return;
  }, [isReady, embeddedWallet]);

  useEffect(() => {
    async function initializeSmartAccount(embeddedWallet: ConnectedEthereumWallet) {
      const provider = await embeddedWallet.getProvider();

      const embeddedWalletClient = createWalletClient({
        account: embeddedWallet.address as `0x${string}`,
        chain: monadTestnet,
        transport: custom(provider),
      });

      const publicClient = createPublicClient({
        chain: monadTestnet, // Replace this with the chain of your app
        transport: http(),
      });

      const kernelAccount = await toKernelSmartAccount({
        client: publicClient,
        entryPoint: {
          address: entryPoint07Address,
          version: "0.7",
        },
        owners: [embeddedWalletClient],
        version: "0.3.1",
      });

      const pimlicoClient = createPimlicoClient({
        transport: http(process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL),
        entryPoint: {
          address: entryPoint07Address,
          version: "0.7",
        },
      });

      const smartAccountClient = createSmartAccountClient({
        account: kernelAccount,
        chain: monadTestnet,
        bundlerTransport: http(process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL),
        paymaster: pimlicoClient, // optional
        userOperation: {
          estimateFeesPerGas: async () => {
            return (await pimlicoClient.getUserOperationGasPrice()).fast; // only when using pimlico bundler
          },
        },
      });

      const smartAccountAddress = await smartAccountClient.account.address;

      setSmartAccountClient(smartAccountClient);
      setSmartAccountAddress(smartAccountAddress);
      setSmartAccountReady(true);
    }

    if (embeddedWallet) initializeSmartAccount(embeddedWallet);
  }, [embeddedWallet?.address]);

  return (
    <SmartWalletContext.Provider
      value={{
        smartAccountAddress: smartAccountAddress,
        smartAccountReady,
        smartAccountClient,
      }}
    >
      {children}
    </SmartWalletContext.Provider>
  );
}