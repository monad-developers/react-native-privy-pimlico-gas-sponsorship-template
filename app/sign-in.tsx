import { useLoginWithEmail, usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignIn() {

  const { isReady } = usePrivy();

  const { sendCode, loginWithCode } = useLoginWithEmail();
  const [codeSent, setCodeSent] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  if (!isReady) {
    return <View style={styles.titleContainer}>
      <Text>Privy is not ready!</Text>
    </View>
  }

    return <View style={styles.titleContainer}>
    <Text>Create a Wallet</Text>
    {!codeSent ? (
      <>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Button
          onPress={async () => {
            await sendCode({email});
            setCodeSent(true);
          }}
          title="Send Code"
          disabled={!email}
        />
      </>
    ) : (
      <>
        <TextInput
          style={styles.input}
          placeholder="Enter code"
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
        <Button title="Login" onPress={() => { loginWithCode({code, email}); router.push("/app")}} disabled={!code} />
      </>
    )}
  </View>
}


const styles = StyleSheet.create({
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
      width: 250,
    },
  });