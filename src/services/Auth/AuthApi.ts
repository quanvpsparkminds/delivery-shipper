import * as Types from "./AuthApi.types";
import { Shipper } from "types";
import { api } from "services/Api";
import { ApiResponse } from "services/Api.types";

const login = async (
  data: Types.TLogin,
): Promise<ApiResponse<Types.TLoginReponse>> => {
  return await api.post<Types.TLoginReponse>("/auth/login", data);
};

const getMe = async (): Promise<ApiResponse<Shipper>> => {
  return await api.get<Shipper>("/delivery/me");
};

export const AuthApi = { login, getMe };
