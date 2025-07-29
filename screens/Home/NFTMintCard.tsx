import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ui/ThemedButton";
import { useSmartWallet } from "@/hooks/useSmartWallet";
import React, { useState } from "react";
import {
  Alert,
  Clipboard,
  Image,
  Linking,
  StyleSheet,
  View,
} from "react-native";
import { encodeFunctionData } from "viem";
import { monadTestnet } from "viem/chains";

const NFT_CONTRACT_ADDRESS = "0x1d27c2B0b632E562edA13f2f49348baD22B5eA8D";
const NFT_CONTRACT_ABI = require("@/constants/abi.json");

const nftImage = require("@/assets/images/nft.png");

export function NFTMintCard() {
  const { smartAccountAddress, smartAccountReady, smartAccountClient } =
    useSmartWallet();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [_, setTransactionHash] = useState<string | null>(null);

  const openExplorer = (hash: string) => {
    const explorerUrl = `https://testnet.monadexplorer.com/tx/${hash}`;
    Linking.openURL(explorerUrl);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
    Alert.alert("Copied!", "Smart wallet address copied to clipboard");
  };

  const showTransactionAlert = (hash: string) => {
    Alert.alert("Transaction Successful!", `Transaction Hash: ${hash}`, [
      {
        text: "Close",
        style: "cancel",
      },
      {
        text: "View on Explorer",
        onPress: () => openExplorer(hash),
      },
    ]);
  };

  async function onMintNFT(count: number) {
    if (smartAccountReady && smartAccountClient?.account) {
      setIsTransactionPending(true);

      let txHash: string;

      const data = encodeFunctionData({
        abi: NFT_CONTRACT_ABI,
        functionName: "mintTo",
        args: [smartAccountAddress],
      });

      try {
        if (count === 1) {
          txHash = await smartAccountClient?.sendTransaction({
            account: smartAccountClient?.account,
            chain: monadTestnet,
            to: NFT_CONTRACT_ADDRESS,
            data,
          });
        } else {
          txHash = await smartAccountClient?.sendTransaction({
            calls: [
              {
                to: NFT_CONTRACT_ADDRESS,
                data,
              },
              {
                to: NFT_CONTRACT_ADDRESS,
                data,
              },
            ],
          });
        }

        console.log(txHash);
        setTransactionHash(txHash);
        showTransactionAlert(txHash);
      } catch (error) {
        console.error("Transaction failed:", error);
        Alert.alert(
          "Transaction Failed",
          "The transaction was rejected or failed. Please try again.",
          [{ text: "OK" }]
        );
      } finally {
        setIsTransactionPending(false);
      }
    }
  }

  const formatAddress = (address: string | null) => {
    if (!address) return "Not connected";
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  return (
    <ThemedView style={styles.container}>
      {/* Rounded corner image */}
      <View style={styles.imageContainer}>
        <Image source={nftImage} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.walletInfo}>
        <ThemedText type="defaultSemiBold" style={styles.walletLabel}>
          Smart Wallet Address:
        </ThemedText>
        <View style={styles.addressContainer}>
          <ThemedText type="default" style={styles.walletAddress}>
            {formatAddress(smartAccountAddress)}
          </ThemedText>
          {smartAccountAddress && (
            <ThemedButton
              title="Copy"
              onPress={() => copyToClipboard(smartAccountAddress)}
              style={styles.copyButton}
              textStyle={styles.copyButtonText}
            />
          )}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <ThemedButton
          title={isTransactionPending ? "Minting..." : "Mint NFT"}
          onPress={() => onMintNFT(1)}
          style={styles.mintButton}
          disabled={isTransactionPending}
        />

        <ThemedButton
          title={isTransactionPending ? "Minting..." : "Batch Mint NFT"}
          onPress={() => onMintNFT(2)}
          style={styles.batchMintButton}
          disabled={isTransactionPending}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  walletInfo: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  walletLabel: {
    marginBottom: 4,
    opacity: 0.8,
  },
  walletAddress: {
    fontFamily: "SF-Pro-Rounded-Medium",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  buttonContainer: {
    gap: 4,
    width: "100%",
  },
  mintButton: {
    backgroundColor: "#7C3AED", // Purple theme
  },
  batchMintButton: {
    backgroundColor: "#7C3AED", // Purple theme
  },
  addressContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 4,
  },
  copyButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e9ecef",
    borderRadius: 6,
  },
  copyButtonText: {
    fontSize: 14,
    color: "#343a40",
  },
});
