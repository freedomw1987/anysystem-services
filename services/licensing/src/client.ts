import { credentials } from "@grpc/grpc-js";
import {
  OrganizationServiceClient,
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetOrganizationRequest,
  Organization,
} from "./proto/organization";

const SERVER_ADDRESS = "localhost:50051";
const client = new OrganizationServiceClient(
  SERVER_ADDRESS,
  credentials.createInsecure()
);

const req: CreateOrganizationRequest = {
  alias: "my-org8",
  name: "My Organization8",
  phone: "853-12312322",
  email: "my-org8@me.com",
  address: "123 Main St, Anytown USA",
  country: "MO",
};

// client.createOrganization(req, (err, res: CreateOrganizationResponse) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(res);
// });
//
client.getOrganization(
  {
    id: "0eb04016-b314-418e-80c2-a0087c7356a7",
  },
  (err, res: Organization) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
  }
);
