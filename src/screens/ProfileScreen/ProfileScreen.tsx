import { images } from "@assets/index";
import { AppText, Layout } from "components";
import {
  Bike,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LogOut,
  Pencil,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from "react-native";
import { palette, style } from "theme";

export const ProfileScreen = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <Layout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[style.pb_xl, style.px_md, style.align_center]}
      >
        {/* Profile Header */}
        <View style={[style.mt_lg, style.align_center]}>
          <View style={styles.avatarContainer}>
            <Image source={images.user_avatar} style={styles.avatar} />
            <Pressable style={styles.editIconWrap}>
              <Pencil color="white" size={14} fill={palette.primary500} />
            </Pressable>
          </View>
          <AppText style={styles.userName}>Nguyễn Văn Nam</AppText>
          <AppText style={styles.phoneNumber}>090 123 4567</AppText>
          <View style={styles.badgeWrap}>
            <ShieldCheck color="#f97316" size={14} />
            <AppText style={styles.badgeText}>Shipper Chuyên nghiệp</AppText>
          </View>
        </View>

        {/* Activity Toggle */}
        <View style={styles.activityCard}>
          <View style={[style.row, style.align_center]}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isActive ? "#22c55e" : "#94a3b8" },
              ]}
            />
            <AppText style={styles.activityText}>Trạng thái hoạt động</AppText>
          </View>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
            trackColor={{ false: "#cbd5e1", true: "#22c55e" }}
            thumbColor="white"
          />
        </View>

        {/* Ratings Card */}
        <View style={styles.card}>
          <View style={[style.row, style.justify_between, style.w_full]}>
            <View style={style.align_center}>
              <AppText style={styles.ratingScore}>4.9</AppText>
              <View style={[style.row, style.gap_xxs]}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i <= 4 ? "#facc15" : "none"}
                    color="#facc15"
                  />
                ))}
              </View>
              <AppText style={styles.ratingCount}>1,250 đánh giá</AppText>
            </View>

            <View style={styles.ratingBars}>
              {[5, 4, 3, 2].map((level) => (
                <View
                  key={level}
                  style={[
                    style.row,
                    style.align_center,
                    style.gap_sm,
                    style.mb_xxs,
                  ]}
                >
                  <AppText style={styles.barLabel}>{level}</AppText>
                  <View style={styles.barBg}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width:
                            level === 5
                              ? "80%"
                              : level === 4
                              ? "10%"
                              : level === 3
                              ? "2%"
                              : "0%",
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Account Management */}
        <View style={[style.w_full, style.mt_lg]}>
          <AppText style={styles.sectionTitle}>QUẢN LÝ TÀI KHOẢN</AppText>
          <MenuItem
            icon={<Bike color="#f97316" size={20} />}
            iconBg="#fff7ed"
            title="Thông tin xe"
            subtitle="Honda Winner X • 29E1-123.45"
          />
          <MenuItem
            icon={<CreditCard color="#f97316" size={20} />}
            iconBg="#fff7ed"
            title="Ví điện tử"
            subtitle="Số dư: 1.250.000đ"
          />
          <MenuItem
            icon={<CircleHelp color="#f97316" size={20} />}
            iconBg="#fff7ed"
            title="Trung tâm trợ giúp"
            subtitle="Hỗ trợ 24/7, hướng dẫn sử dụng"
          />
          <MenuItem
            icon={<Settings color="#f97316" size={20} />}
            iconBg="#fff7ed"
            title="Cài đặt ứng dụng"
            subtitle="Thông báo, ngôn ngữ, bảo mật"
          />
        </View>

        {/* Logout */}
        <Pressable style={[styles.card, styles.logoutCard, style.mt_md]}>
          <View style={[styles.menuIconWrap, { backgroundColor: "#fee2e2" }]}>
            <LogOut color="#ef4444" size={20} />
          </View>
          <AppText style={styles.logoutText}>Đăng xuất</AppText>
        </Pressable>

        <AppText style={styles.versionText}>
          Phiên bản ứng dụng 2.4.1 (Build 1024)
        </AppText>
      </ScrollView>
    </Layout>
  );
};

const MenuItem = ({ icon, iconBg, title, subtitle }: any) => (
  <Pressable style={[styles.card, styles.menuItem]}>
    <View style={[styles.menuIconWrap, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <View style={style.flex_1}>
      <AppText style={styles.menuTitle}>{title}</AppText>
      <AppText style={styles.menuSubtitle}>{subtitle}</AppText>
    </View>
    <ChevronRight color="#94a3b8" size={20} />
  </Pressable>
);

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 999,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconWrap: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 99,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    color: "#0f172a",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  badgeWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff7ed",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#c2410c",
  },
  activityCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f97316",
  },
  ratingCount: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  ratingBars: {
    flex: 1,
    marginLeft: 24,
    justifyContent: "center",
  },
  barLabel: {
    fontSize: 12,
    color: "#64748b",
    width: 10,
  },
  barBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#f97316",
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  menuIconWrap: {
    padding: 10,
    borderRadius: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff5f5",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ef4444",
  },
  versionText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 32,
    marginBottom: 16,
  },
});
