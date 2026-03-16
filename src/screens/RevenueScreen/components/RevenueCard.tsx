import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "components";
import { Wallet } from "lucide-react-native";
import { style } from "theme";

export const RevenueCard = () => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContents}>
        <AppText style={styles.cardTitle}>Tổng thu nhập hôm nay</AppText>
        <View style={[style.row_between, style.align_end, style.mt_sm]}>
          <AppText style={styles.amount}>850.000đ</AppText>
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>+12% so với hôm qua</AppText>
          </View>
        </View>
        <TouchableOpacity style={styles.withdrawButton}>
          <Wallet color="#ec5b13" size={18} />
          <AppText style={styles.withdrawText}>Rút tiền</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 16,
  },
  cardContents: {
    backgroundColor: "#ec5b13", // Fallback if gradient isn't available easily, though a gradient is preferred.
    borderRadius: 12,
    padding: 24,
    shadowColor: "#ec5b13",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  withdrawButton: {
    marginTop: 24,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ec5b13",
  },
});
