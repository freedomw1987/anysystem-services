import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetOrganizationRequest,
  UpdateOrganizationRequest,
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  Organization,
  orgStatusFromJSON,
} from "../../proto/organization";
//Auth
import { authenticate } from "./AuthController";
//Models
import { create, get, remove, update } from "../../models/Organization";

const createOrganization = async (
  call: ServerUnaryCall<CreateOrganizationRequest, CreateOrganizationResponse>,
  callback: sendUnaryData<CreateOrganizationResponse>
) => {
  if (!authenticate(call)) {
    return callback(new Error("Unauthorized"));
  }
  const request = call.request;
  const response = await create(request);

  if (response instanceof Error) {
    return callback(response);
  }

  callback(null, response);
};

const getOrganization = async (
  call: ServerUnaryCall<GetOrganizationRequest, Organization>,
  callback: sendUnaryData<Organization>
) => {
  if (!authenticate(call)) {
    return callback(new Error("Unauthorized"));
  }
  const request = call.request;
  if (!request.id) {
    return callback(new Error("Missing organization ID"));
  }
  const response = await get(request);

  if (response instanceof Error) {
    return callback(response);
  }
  if (!response) {
    return callback(new Error("Organization not found"));
  }

  const resp = {
    ...response,
    status: orgStatusFromJSON(response.status),
  };

  callback(null, resp);
};

const updateOrganization = async (
  call: ServerUnaryCall<UpdateOrganizationRequest, Organization>,
  callback: sendUnaryData<Organization>
) => {
  if (!authenticate(call)) {
    return callback(new Error("Unauthorized"));
  }
  const request = call.request;
  if (!request.id) {
    return callback(new Error("Missing organization ID"));
  }
  const response = await update(request);

  if (response instanceof Error) {
    return callback(response);
  }
  if (!response) {
    return callback(new Error("Organization not found"));
  }

  const resp = {
    ...response,
    status: orgStatusFromJSON(response.status),
  };

  callback(null, resp);
};

const removeOrganization = async (
  call: ServerUnaryCall<DeleteOrganizationRequest, DeleteOrganizationResponse>,
  callback: sendUnaryData<DeleteOrganizationResponse>
) => {
  if (!authenticate(call)) {
    return callback(new Error("Unauthorized"));
  }
  const request = call.request;
  if (!request.id) {
    return callback(new Error("Missing organization ID"));
  }
  const response = await remove(request);
  if (response instanceof Error) {
    return callback(response);
  }
  callback(null, response);
};

export default {
  createOrganization,
  getOrganization,
  updateOrganization,
  removeOrganization,
};
