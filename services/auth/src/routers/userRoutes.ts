import { Elysia, t } from "elysia";
//Models
import { UserDTO } from "../models/User";
//Controllers

export const userRoutes = new Elysia({
  prefix: "/user",
})
  // get a User by id
  .post(
    "/:uuid",
    async ({ params: { uuid } }) => {
      return {
        id: 1,
        uuid,
        email: "pQXt9@example.com",
        name: "John Doe",
        phoneNumber: "+853-66297530",
        address: "123 Main Street, Anytown USA 12345",
        status: "ACTIVE",
        createdAt: 1600000000,
        updatedAt: 1600000000,
      };
    },
    {
      detail: {
        summary: "Get a user",
        tags: ["User"],
      },
      params: t.Pick(UserDTO, ["uuid"]),
      body: t.Object({}),
      response: {
        200: UserDTO,
      },
    }
  );
