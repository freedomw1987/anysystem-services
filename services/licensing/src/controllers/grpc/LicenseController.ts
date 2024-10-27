import moment from "moment";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import {
  CheckLicenseRequest,
  CheckLicenseResponse,
  CreateLicenseRequest,
  CreateLicenseResponse,
  licenseNameToJSON,
  licenseStatusFromJSON,
} from "../../proto/license";
//Auth
import { authenticate } from "./AuthController";
//Models
import { create, check } from "../../models/License";

const createLicense = async (
  call: ServerUnaryCall<CreateLicenseRequest, CreateLicenseResponse>,
  callback: sendUnaryData<CreateLicenseResponse>
) => {
  if (!authenticate(call)) {
    return callback(new Error("Unauthorized"));
  }
  const request = {
    ...call.request,
    name: licenseNameToJSON(call.request.name) as "STANDARD" | "PREMIUM",
    startedAt: call.request?.startedAt ? call.request.startedAt : new Date(),
    expiredAt: call.request?.expiredAt
      ? call.request.expiredAt
      : moment().add(1, "year").toDate(),
  };

  const response = await create(request);

  if (response instanceof Error) {
    return callback(response);
  }

  if (!response) {
    return callback(new Error("Could not create license"));
  }

  callback(null, {
    ...response,
    status: licenseStatusFromJSON(response.status),
  });
};

const checkLicense = async (
  call: ServerUnaryCall<CheckLicenseRequest, CheckLicenseResponse>,
  callback: sendUnaryData<CheckLicenseResponse>
) => {
  if (!authenticate(call)) {
    return callback(new Error("Unauthorized"));
  }
  const request = call.request;
  if (!request.organizationId) {
    return callback(new Error("Missing organization ID"));
  }
  if (!request.license) {
    return callback(new Error("Missing license ID"));
  }

  const response = await check(request);

  if (response instanceof Error) {
    return callback(response);
  }
  if (!response) {
    return callback(new Error("License not found"));
  }

  const resp = {
    ...response,
    status: licenseStatusFromJSON(response.status),
  };

  callback(null, resp);
};

export default {
  createLicense,
  checkLicense,
};
