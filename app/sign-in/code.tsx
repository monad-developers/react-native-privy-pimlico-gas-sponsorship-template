import { ThemedText } from "@/components/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import { useLoginWithEmail } from "@privy-io/expo";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";

export default function CodeScreen() {
  const { email, code, setCode } = useAuth();
  const { loginWithCode } = useLoginWithEmail();

  return (
    <View style={styles.container}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>Enter the code</ThemedText>
        <ThemedText style={{ textAlign: 'center' }} type="subtitle">A code was sent to {email}</ThemedText>
      </View>
      <OTPTextInput
        inputCount={6}
        autoFocus={true}
        handleTextChange={setCode}
        tintColor="#f0f0f0"
        offTintColor="#f0f0f0"
        containerStyle={{ marginVertical: 20 }}
        textInputStyle={{
          borderRadius: 8,
          backgroundColor: '#f0f0f0',
        }}
      />
      <ThemedButton
        title="Login"
        onPress={async () => {
          await loginWithCode({ code, email });
          router.push("/app");
        }}
        disabled={code.length !== 6}
      />
      <Button
        title="Back"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
}); 