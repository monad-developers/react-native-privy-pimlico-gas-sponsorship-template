import Avatar from "@/components/ui/Avatar";
import { useWalletContext } from "@/context/WalletContext";
import { getAddressForUser } from "@/utils";
import { usePrivy } from "@privy-io/expo";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { formatUnits } from "viem/utils";

export default function WalletHeader() {
  const { user } = usePrivy();

  const address = user ? getAddressForUser(user) : null;

  const { getUSDCBalance, getMONBalance } = useWalletContext();
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [monBalance, setMonBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getBalance = async () => {
      const [balance, monBalance] = await Promise.all([
        getUSDCBalance(),
        getMONBalance(),
      ]);
      setBalance(balance);
      setMonBalance(monBalance ? Number(formatUnits(monBalance, 18)) : 0);
    };
    getBalance();
  }, [getUSDCBalance, getMONBalance]);
  
  return (
    <>
      <Avatar seed={address || "user"} size={96} style={{ marginBottom: 24 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 24, color: "#777" }}>$</Text>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            fontFamily: "SF-Pro-Rounded-Semibold",
          }}
        >
          {balance ? Number(formatUnits(balance, 6)).toFixed(2) : "0.00"}
        </Text>
      </View>
      <View style={{ height: 24, marginTop: 10 }}>
        <Text style={{ fontSize: 16, color: "#777" }}>
          Gas: {monBalance ? monBalance.toFixed(2) : "0.00"} MON
        </Text>
      </View>
    </>
  );
}
