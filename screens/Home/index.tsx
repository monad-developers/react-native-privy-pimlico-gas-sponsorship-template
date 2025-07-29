import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ui/ThemedButton";
import { NFTMintCard } from "@/screens/Home/NFTMintCard";
import { usePrivy } from "@privy-io/expo";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { logout } = usePrivy();

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          NFT Minting Demo
        </ThemedText>

        <View style={styles.cardContainer}>
          <NFTMintCard />
        </View>

        <ThemedButton
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    opacity: 0.8,
    maxWidth: 300,
  },
  cardContainer: {
    justifyContent: "center",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#000", // Purple theme
  },
});
