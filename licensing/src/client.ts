import { credentials, Metadata } from "@grpc/grpc-js";
import { OrganizationServiceClient } from "./proto/organization";
import { LicenseServiceClient } from "./proto/license";

// grpc client example

const SERVER_ADDRESS = "localhost:50051";
const orgClient = new OrganizationServiceClient(
  SERVER_ADDRESS,
  credentials.createInsecure()
);
const licenseClient = new LicenseServiceClient(
  SERVER_ADDRESS,
  credentials.createInsecure()
);

const metadata = new Metadata();
// metadata.set("authorization", "Bearer " + API_TOKEN);

// // Create an organization
// const req = {
//   alias: "my-org8",
//   name: "My Organization8",
//   phone: "853-12312322",
//   email: "my-org8@me.com",
//   address: "123 Main St, Anytown USA",
//   country: "MO",
// };

// client.createOrganization(req, (err, res) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(res);
// });

orgClient.getOrganization(
  {
    id: "0eb04016-b314-418e-80c2-a0087c7356a7",
  },
  metadata,
  (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
  }
);

licenseClient.checkLicense(
  {
    organizationId: "ac958da2-cbd3-4ebf-b171-2823492b7939",
    license: "c1547978-71ec-49a5-bacf-a3051117221e",
  },
  metadata,
  (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
  }
);
