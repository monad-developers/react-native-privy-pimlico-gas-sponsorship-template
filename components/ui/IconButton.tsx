import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { SymbolViewProps } from 'expo-symbols';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  icon: SymbolViewProps['name'];
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function IconButton({ icon, label, onPress, style }: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconSymbol
        name={icon}
        size={24}
        color="#000"
      />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fefefe",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    width: '100%',
    height: 70,
    marginHorizontal: 2,
  },
  text: {
    color: "#000",
    fontFamily: "SF-Pro-Rounded-Semibold",
    fontSize: 20,
  },
}); 