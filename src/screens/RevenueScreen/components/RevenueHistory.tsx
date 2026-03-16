import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "components";
import { style } from "theme";

export const RevenueHistory = () => {
  return (
    <View style={styles.container}>
      <View style={[style.row_between, style.align_center, style.mb_sm]}>
        <AppText style={styles.title}>Lịch sử đơn hàng gần đây</AppText>
        <TouchableOpacity>
          <AppText style={styles.link}>Xem tất cả</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {/* Item 1 */}
        <View style={styles.item}>
          <View style={[style.row, style.align_center, style.gap_xs]}>
            <View style={styles.iconBox}>
            </View>
            <View>
              <AppText style={styles.itemName}>Đơn hàng #SHP99201</AppText>
              <AppText style={styles.itemMeta}>
                14:20 • Thanh toán Tiền mặt
              </AppText>
            </View>
          </View>
          <AppText style={styles.itemAmount}>+35.000đ</AppText>
        </View>

        {/* Item 2 */}
        <View style={styles.item}>
          <View style={[style.row, style.align_center, style.gap_xs]}>
            <View style={styles.iconBox}>
            </View>
            <View>
              <AppText style={styles.itemName}>Đơn hàng #SHP99185</AppText>
              <AppText style={styles.itemMeta}>13:45 • Thanh toán Ví</AppText>
            </View>
          </View>
          <AppText style={styles.itemAmount}>+42.000đ</AppText>
        </View>

        {/* Item 3 */}
        <View style={styles.item}>
          <View style={[style.row, style.align_center, style.gap_xs]}>
            <View style={styles.iconBox}>
            </View>
            <View>
              <AppText style={styles.itemName}>Đơn hàng #SHP99150</AppText>
              <AppText style={styles.itemMeta}>
                12:10 • Thanh toán Tiền mặt
              </AppText>
            </View>
          </View>
          <AppText style={styles.itemAmount}>+28.000đ</AppText>
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
  },
  link: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ec5b13",
  },
  list: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  itemMeta: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
});
