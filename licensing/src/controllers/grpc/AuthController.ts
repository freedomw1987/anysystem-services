import { type ServerUnaryCall } from "@grpc/grpc-js";
import { isAuth } from "../../models/Auth";

export const authenticate = (call: ServerUnaryCall<any, any>) => {
  const token = call.metadata.get("authorization");
  if (!token?.[0]) {
    return false;
  }
  const bearer = (token[0] as string).replace("Bearer ", "");

  return isAuth(bearer);
};
