import { Elysia } from "elysia";
import { UserDTO } from "../models/User";
import {
  LoginRequestDTO,
  LoginTokenDTO,
  LoginFailureDTO,
  SignupDTO,
} from "../models/Auth";

export const authRoutes = new Elysia({
  prefix: "/auth",
})
  // login a User
  .post(
    "/login",
    ({ body, set }) => {
      if (body.email === "pQXt9@example.com" && body.password === "123456") {
        return {
          uuid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          token: "2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          createdAt: 1600000000,
          expiredAt: 1600000000 + 86400000 * 30,
          updatedAt: 1600000000,
        };
      }
      set.status = 401;
      return {
        status: 401,
        message: "Login failed",
      };
    },
    {
      detail: {
        summary: "User login",
        tags: ["Auth"],
      },
      body: LoginRequestDTO,
      response: {
        200: LoginTokenDTO,
        401: LoginFailureDTO,
      },
    }
  )
  // create a User
  .post(
    "/signup",
    ({ body }) => {
      return {
        id: 1,
        uuid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        email: body.email,
        status: "ACTIVE",
        createdAt: 1600000000,
        updatedAt: 1600000000,
      };
    },
    {
      detail: {
        summary: "User sign up",
        tags: ["Auth"],
      },
      body: SignupDTO,
      response: {
        200: UserDTO,
      },
    }
  );
