import {
  Server,
  ServerCredentials,
  type ServerUnaryCall,
  type sendUnaryData,
} from "@grpc/grpc-js";

import {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetOrganizationRequest,
  Organization,
  OrganizationServiceService,
  orgStatusFromJSON,
} from "./proto/organization";

import { create, get } from "./models/Organization";

const authenticate = (call: ServerUnaryCall<any, any>) => {
  const token = call.metadata.get("authorization");
  if (!token) {
    return new Error("Missing authorization token");
  }
  console.log(token);
  return true;
};

const createOrganization = async (
  call: ServerUnaryCall<CreateOrganizationRequest, CreateOrganizationResponse>,
  callback: sendUnaryData<CreateOrganizationResponse>
) => {
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

  const resp: Organization = {
    ...response,
    status: orgStatusFromJSON(response.status),
  };

  callback(null, resp);
};

const server = new Server();
server.addService(OrganizationServiceService, {
  createOrganization,
  getOrganization,
});
server.bindAsync(
  "0.0.0.0:50051",
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`);
  }
);
