import { credentials } from "@grpc/grpc-js";
import {
  OrganizationServiceClient,
  CreateOrganizationRequest,
  CreateOrganizationResponse,
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

client.createOrganization(req, (err, res: CreateOrganizationResponse) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
