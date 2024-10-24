import {
  Server,
  ServerCredentials,
  type ServerUnaryCall,
  type sendUnaryData,
} from "@grpc/grpc-js";

import {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  OrganizationServiceService,
} from "./proto/organization";

import { create } from "./models/Organization";

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

const server = new Server();
server.addService(OrganizationServiceService, { createOrganization });
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
