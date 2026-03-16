import { AppText } from "components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { style } from "theme";

export const OrderStatusToggle = () => {
  return (
    <View style={[style.row, styles.toggleWrapper]}>
      <View style={styles.toggleBar}>
        <View style={styles.toggleKnob} />
      </View>
      <AppText style={styles.toggleText}>ĐANG HOẠT ĐỘNG</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleWrapper: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  toggleBar: {
    width: 32,
    height: 16,
    backgroundColor: "#22c55e",
    borderRadius: 8,
    justifyContent: "center",
    marginRight: 8,
  },
  toggleKnob: {
    width: 12,
    height: 12,
    backgroundColor: "white",
    borderRadius: 6,
    marginLeft: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    letterSpacing: -0.2,
  },
});
