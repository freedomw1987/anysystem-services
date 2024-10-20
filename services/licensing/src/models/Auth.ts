import { API_TOKEN } from "../constants/config";

export const isAuth = (bearer: string | undefined) => {
  if (!bearer) return false;
  return bearer === API_TOKEN;
};
