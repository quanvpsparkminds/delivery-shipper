import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AppText } from "components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, HelpCircle } from "lucide-react-native";
import {
  RevenueCard,
  RevenueBreakdown,
  RevenueChart,
  RevenueHistory,
} from "./components";

export const RevenueScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={styles.headerWrapper}>
        {/* Time Filter Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tabBtn, styles.activeTabBtn]}>
            <AppText style={[styles.tabText, styles.activeTabText]}>
              Hôm nay
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn}>
            <AppText style={styles.tabText}>Tuần này</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn}>
            <AppText style={styles.tabText}>Tháng này</AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RevenueCard />
        <RevenueBreakdown />
        <RevenueChart />
        <RevenueHistory />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f6",
  },
  headerWrapper: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    flex: 1,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabBtn: {
    borderBottomColor: "#ec5b13",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#ec5b13",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
