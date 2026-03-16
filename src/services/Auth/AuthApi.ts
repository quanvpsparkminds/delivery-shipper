import * as Types from "./AuthApi.types";
import { api } from "services/Api";
import { ApiResponse } from "services/Api.types";

const login = async (
  data: Types.TLogin,
): Promise<ApiResponse<Types.TLoginReponse>> => {
  return await api.post<Types.TLoginReponse>("/auth/login", data);
};

export const AuthApi = { login };
