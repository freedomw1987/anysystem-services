import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/config";

export type isAuthProps = {
  bearer: string | undefined;
};
export const isAuth = (bearer: string | undefined): boolean => {
  if (!bearer) return false;
  try {
    const p = jwt.verify(bearer, SECRET_KEY);
    if (!p) return false;
    return true;
  } catch (error) {
    return false;
  }
};
