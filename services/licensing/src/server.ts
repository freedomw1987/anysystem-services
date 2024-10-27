import { Server, ServerCredentials } from "@grpc/grpc-js";

import { OrganizationServiceService } from "./proto/organization";
import { LicenseServiceService } from "./proto/license";

import OrgController from "./controllers/grpc/OrgController";
import LicenseController from "./controllers/grpc/LicenseController";

const server = new Server();
server.addService(OrganizationServiceService, OrgController);
server.addService(LicenseServiceService, LicenseController);
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
