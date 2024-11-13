import { type ServerUnaryCall } from "@grpc/grpc-js";
import { API_TOKEN } from "../../constants/config";

export const authenticate = (call: ServerUnaryCall<any, any>) => {
  const token = call.metadata.get("authorization");
  if (!token) {
    return false;
  }
  if (token[0] !== "Bearer " + API_TOKEN) {
    return false;
  }
  return true;
};
