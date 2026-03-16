import React from "react";
import { View, StyleSheet } from "react-native";
import { AppText } from "components";
import { Truck, Gift, HeartHandshake } from "lucide-react-native";
import { style } from "theme";

export const RevenueBreakdown = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Chi tiết thu nhập</AppText>
      <View style={styles.list}>
        {/* Phí giao hàng */}
        <View style={[style.row_between, styles.item]}>
          <View style={[style.row, style.align_center, style.gap_xs]}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: "rgba(59, 130, 246, 0.1)" },
              ]}
            >
              <Truck color="#2563eb" size={20} />
            </View>
            <View>
              <AppText style={styles.itemTitle}>Phí giao hàng</AppText>
              <AppText style={styles.itemSub}>24 đơn hàng</AppText>
            </View>
          </View>
          <AppText style={[styles.cost, { color: "#0f172a" }]}>
            620.000đ
          </AppText>
        </View>

        {/* Thưởng mục tiêu */}
        <View style={[style.row_between, styles.item]}>
          <View style={[style.row, style.align_center, style.gap_xs]}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: "rgba(34, 197, 94, 0.1)" },
              ]}
            >
              <Gift color="#16a34a" size={20} />
            </View>
            <View>
              <AppText style={styles.itemTitle}>Thưởng mục tiêu</AppText>
              <AppText style={styles.itemSub}>Hoàn thành mốc 2</AppText>
            </View>
          </View>
          <AppText style={[styles.cost, { color: "#16a34a" }]}>
            150.000đ
          </AppText>
        </View>

        {/* Tiền tip */}
        <View style={[style.row_between, styles.item]}>
          <View style={[style.row, style.align_center, style.gap_xs]}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: "rgba(234, 179, 8, 0.1)" },
              ]}
            >
              <HeartHandshake color="#ca8a04" size={20} />
            </View>
            <View>
              <AppText style={styles.itemTitle}>Tiền Tip</AppText>
              <AppText style={styles.itemSub}>Từ khách hàng</AppText>
            </View>
          </View>
          <AppText style={[styles.cost, { color: "#0f172a" }]}>80.000đ</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  list: {
    gap: 12,
  },
  item: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconBox: {
    padding: 8,
    borderRadius: 8,
    marginRight: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  itemSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
