export type TLogin = {
  email: string;
  password: string;
  mode: "DELIVERY";
};

export type TLoginReponse = {
  token: string;
  refreshToken: string;
};
