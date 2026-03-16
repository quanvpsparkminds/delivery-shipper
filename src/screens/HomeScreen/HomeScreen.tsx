import { AppButton, AppText, Layout } from "components";
import { useLogin } from "hooks";
import React from "react";

export const HomeScreen = () => {
  const { mutate: loginMutation } = useLogin();

  const handleLogin = () => {
    loginMutation(
      {
        email: "delivery@gmail.com",
        password: "123456",
        mode: "DELIVERY",
      },
      {
        onError(error, variables, context) {
          console.log(error);
        },
        onSuccess(data, variables, context) {
          console.log(data);
        },
      },
    );
  };

  return (
    <Layout>
      <AppButton onPress={handleLogin}>Login</AppButton>
    </Layout>
  );
};
