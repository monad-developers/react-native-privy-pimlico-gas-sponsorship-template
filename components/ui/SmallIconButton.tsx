import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { SymbolViewProps } from 'expo-symbols';
import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface SmallIconButtonProps {
  icon: SymbolViewProps['name'];
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
}

export default function SmallIconButton({ icon, label, onPress, style, textStyle, iconSize = 16 }: SmallIconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconSymbol
        name={icon}
        size={iconSize}
        color="#000"
      />
      <Text style={[styles.text, textStyle]} numberOfLines={1} ellipsizeMode="middle">{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fefefe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    height: 32,
    minWidth: 80,
    maxWidth: 180,
  },
  text: {
    color: "#000",
    fontFamily: "SF-Pro-Rounded-Semibold",
    fontSize: 13,
    flexShrink: 1,
    maxWidth: 120,
  },
}); 