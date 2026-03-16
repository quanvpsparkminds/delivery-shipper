import {
  AppButton,
  AppIcon,
  AppKeyboardAvoidingView,
  AppText,
  AppTextInput,
  Layout,
  PasswordInput,
} from "components";
import { useAppDispatch, useLogin } from "hooks";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Image } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { style, spacing, scale } from "theme";
import { TLogin } from "services";
import { useAppTheme } from "provider";
import { images } from "@assets/index";
import { signIn } from "store";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng nhập email"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const LoginScreen = () => {
  const { colorScheme } = useAppTheme();
  const { mutate: loginMutation, isPending } = useLogin();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TLogin, "mode">>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "delivery@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = (data: Omit<TLogin, "mode">) => {
    loginMutation(
      {
        ...data,
        mode: "DELIVERY",
      },
      {
        onError(error) {},
        onSuccess(response) {
          dispatch(signIn({ token: response.data.token || "" }));
        },
      },
    );
  };

  return (
    <Layout safeAreaOnTop safeAreaOnBottom paddingX="lg">
      <AppKeyboardAvoidingView>
        <View style={style.center}>
          <Image source={images.logo} style={$logo} />
          <AppText style={$title}>XIN CHÀO!</AppText>
          <AppText style={$subtitle}>Đăng nhập để bắt đầu giao hàng</AppText>
        </View>

        <View style={style.gap_md}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Email"
                placeholder="Nhập email của bạn"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <AppText style={$forgotPassword}>Quên mật khẩu?</AppText>

          <AppButton
            title="ĐĂNG NHẬP"
            style={style.mt_lg}
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
          />
        </View>

        <View style={[$footer, style.row_center, style.mt_xxl]}>
          <AppText style={style.tx_color_gray500}>Chưa có tài khoản? </AppText>
          <AppText style={[style.tx_fw_bold, { color: colorScheme.primary }]}>
            Đăng ký ngay
          </AppText>
        </View>
      </AppKeyboardAvoidingView>
    </Layout>
  );
};

const $logo: any = {
  width: scale.x(120),
  height: scale.x(120),
};

const $title: any = [
  style.tx_size_xl,
  style.tx_fw_bold,
  style.mt_sm,
  { textAlign: "center" },
];

const $subtitle: any = [
  style.tx_color_gray500,
  style.mt_xxs,
  { textAlign: "center" },
];

const $forgotPassword: any = [
  style.tx_fw_medium,
  style.align_end,
  { color: "#64748b", alignSelf: "flex-end", marginTop: -spacing.xs },
];

const $footer: any = {
  flex: 1,
  justifyContent: "flex-end",
};
