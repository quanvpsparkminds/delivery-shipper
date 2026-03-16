import React from "react";
import { View, StyleSheet, DimensionValue } from "react-native";
import { AppText } from "components";
import { style } from "theme";

const CHART_DATA = [
  { label: "T2", percent: 60, height: "60%" },
  { label: "T3", percent: 45, height: "45%" },
  { label: "T4", percent: 85, height: "85%" },
  { label: "T5", percent: 30, height: "30%" },
  { label: "T6", percent: 70, height: "70%" },
  { label: "T7", percent: 95, height: "95%" },
  { label: "CN", percent: 100, height: "100%", isToday: true },
];

export const RevenueChart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={style.row_between}>
          <AppText style={styles.title}>Biểu đồ 7 ngày qua</AppText>
          <AppText style={styles.subtitle}>Trung bình: 720k/ngày</AppText>
        </View>

        <View style={styles.chartArea}>
          {CHART_DATA.map((item, index) => (
            <View key={index} style={styles.barCol}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { height: item.height as DimensionValue },
                    item.isToday && styles.barFillToday,
                  ]}
                />
              </View>
              <AppText
                style={[
                  styles.barLabel,
                  item.isToday ? styles.barLabelToday : undefined,
                ]}
              >
                {item.label}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  chartArea: {
    flexDirection: "row",
    height: 160,
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    height: "100%",
  },
  barTrack: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    backgroundColor: "rgba(236, 91, 19, 0.4)",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barFillToday: {
    backgroundColor: "#ec5b13",
  },
  barLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#94a3b8",
  },
  barLabelToday: {
    color: "#ec5b13",
  },
});
