import React from "react";
import { images } from "@assets/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StaticParamList, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useAppSelector } from "hooks";
import {
  CircleDollarSign,
  ClipboardList,
  Clock,
  User,
} from "lucide-react-native";
import {
  HistoryScreen,
  HomeScreen,
  LanguageScreen,
  LoginScreen,
  OrderScreen,
  ProfileScreen,
  RevenueScreen,
  FetchingDataScreen,
  OrderDetailScreen,
} from "screens";
import { selectIsSignedIn, selectUser } from "store";
import { DeliveryOrder } from "types";
import { isAndroid } from "utils";

const useIsSignedIn = () => useAppSelector(selectIsSignedIn);
const useIsSignedOut = () => !useAppSelector(selectIsSignedIn);
const useIsUserAvailable = () => Boolean(useAppSelector(selectUser));
const useIsUserNotAvailable = () => !useAppSelector(selectUser);

const MainTabs = createBottomTabNavigator({
  screens: {
    OrderTab: {
      screen: OrderScreen,
      options: {
        title: "Nhận đơn",
        tabBarIcon: ({ color, size }) => (
          <ClipboardList color={color} size={size} />
        ),
        headerShown: false,
      },
    },
    HistoryTab: {
      screen: HistoryScreen,
      options: {
        title: "Lịch sử",
        tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
      },
    },
    RevenueTab: {
      screen: RevenueScreen,
      options: {
        title: "Doanh thu",
        tabBarIcon: ({ color, size }) => (
          <CircleDollarSign color={color} size={size} />
        ),
      },
    },
    ProfileTab: {
      screen: ProfileScreen,
      options: {
        title: "Cá nhân",
        tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
      },
    },
  },
});

export const AppStack = createNativeStackNavigator({
  screenOptions: {
    headerBackImageSource: isAndroid ? images.chevron_left : undefined,
    headerShadowVisible: false,
    headerBackButtonDisplayMode: "minimal",
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        FetchingData: {
          if: useIsUserNotAvailable,
          screen: FetchingDataScreen,
          options: {
            headerShown: false,
          },
        },
        Home: {
          if: useIsUserAvailable,
          screen: MainTabs,
          options: {
            headerShown: false,
          },
        },
      },
    },
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        Home: LoginScreen,
      },
    },
  },
  screens: {
    Language: LanguageScreen,
    OrderDetail: {
      screen: OrderDetailScreen,
    },
  },
});

export type AppStackParamList = StaticParamList<typeof AppStack>;

export type AppStackNavigationProps<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export function useAppNavigation<T extends keyof AppStackParamList>() {
  return useNavigation<AppStackNavigationProps<T>>();
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
