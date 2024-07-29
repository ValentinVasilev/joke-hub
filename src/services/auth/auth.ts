
import { AxiosResponse } from "axios";
import { RegisterModel } from "./AuthModels";
import axiosInstance from "@/lib/axios-config";

interface AuthService {
  register: (data: RegisterModel) => Promise<AxiosResponse<RegisterModel>>;
}

export const authentication: AuthService = {
  register: (data: RegisterModel) => axiosInstance.post("/api/signup", data)
}