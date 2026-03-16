import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AppText } from "components";
import { Calendar, ChevronDown } from "lucide-react-native";

export const HistoryFilter = () => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        <TouchableOpacity style={[styles.filterBtn, styles.activeBtn]}>
          <AppText style={[styles.filterText, styles.activeText]}>
            Tất cả
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <AppText style={styles.filterText}>Hoàn thành</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <AppText style={styles.filterText}>Đã hủy</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, styles.dateBtn]}>
          <Calendar color="#ec5b13" size={16} />
          <AppText style={styles.dateText}>Tháng này</AppText>
          <ChevronDown color="#ec5b13" size={16} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  filterBtn: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  activeBtn: {
    backgroundColor: "#ec5b13",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
  },
  activeText: {
    color: "white",
  },
  dateBtn: {
    backgroundColor: "rgba(236, 91, 19, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(236, 91, 19, 0.2)",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ec5b13",
  },
});
