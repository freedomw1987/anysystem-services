import { t } from "elysia";
import { type Static } from "elysia";
import { PrismaClient, LicenseName } from "@prisma/client";
const prisma = new PrismaClient();

export enum LicenseStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

export const CreateLicenseSchema = t.Object({
  organizationId: t.String({
    description: "The UUID of the organization",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  name: t.Enum(LicenseName, {
    description: "The name of the license",
    examples: ["STANDARD", "PREMIUM"],
  }),
  startedAt: t.Date({
    description: "The start date of the license",
    examples: ["2022-01-01"],
  }),
  expiredAt: t.Date({
    description: "The expiration date of the license",
    examples: ["2022-12-31"],
  }),
});

export const CreateLicenseResponseSchema = t.Object({
  id: t.String({
    description: "The UUID of the license",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  status: t.Enum(LicenseStatus, {
    description: "The status of the license",
    examples: ["INACTIVE", "ACTIVE", "EXPIRED"],
  }),
});

type CreateLicenseProps = Static<typeof CreateLicenseSchema>;
type CreateLicenseResponse = Static<typeof CreateLicenseResponseSchema>;
export const create = async (
  props: CreateLicenseProps
): Promise<CreateLicenseResponse | undefined> => {
  try {
    const license = await prisma.license.create({
      data: {
        ...props,
      },
    });
    if (!license) {
      return;
    }
    const now = new Date();
    return {
      id: license.id,
      status:
        now < license.startedAt
          ? LicenseStatus.INACTIVE
          : now >= license.expiredAt
          ? LicenseStatus.EXPIRED
          : LicenseStatus.ACTIVE,
    };
  } catch (error) {
    console.log(error);
  }
};

export const CheckLicenseSchema = t.Object({
  organizationId: t.String({
    description: "The UUID of the organization",
    examples: ["2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  license: t.String({
    description: "License id",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
});
export const CheckLicenseResponseSchema = t.Object({
  id: t.String({
    description: "The UUID of the license",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  status: t.Enum(LicenseStatus, {
    description: "The status of the license",
    examples: ["INACTIVE", "ACTIVE", "EXPIRED"],
  }),
  startedAt: t.Date({
    description: "The start date of the license",
    examples: ["2022-01-01"],
  }),
  expiredAt: t.Date({
    description: "The expiration date of the license",
    examples: ["2022-12-31"],
  }),
});
type CheckLicenseProps = Static<typeof CheckLicenseSchema>;
type CheckLicenseResponse = Static<typeof CheckLicenseResponseSchema>;
export const check = async (
  props: CheckLicenseProps
): Promise<CheckLicenseResponse | undefined> => {
  try {
    const license = await prisma.license.findFirst({
      where: {
        organizationId: props.organizationId,
        id: props.license,
      },
    });
    if (!license) {
      return;
    }

    const now = new Date();
    return {
      id: license.id,
      status:
        now < license.startedAt
          ? LicenseStatus.INACTIVE
          : now >= license.expiredAt
          ? LicenseStatus.EXPIRED
          : LicenseStatus.ACTIVE,
      startedAt: license.startedAt,
      expiredAt: license.expiredAt,
    };
  } catch (error) {
    console.log(error);
  }
};
