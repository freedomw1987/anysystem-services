import { t } from "elysia";
import { type Static } from "elysia";
import { PrismaClient, OrgStatus } from "@prisma/client";
const prisma = new PrismaClient();

export const CreateOrgSchema = t.Object({
  alias: t.String({
    description: "The alias of the organization",
    examples: ["my-org"],
  }),
  name: t.String({
    description: "The name of the organization",
    examples: ["My Organization"],
  }),
  phone: t.String({
    description: "The phone number of the organization",
    examples: ["+853-66297530"],
  }),
  email: t.String({
    description: "The email of the organization",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  address: t.String({
    description: "The address of the organization",
    examples: ["123 Main St, Anytown USA"],
  }),
  country: t.String({
    description: "The country of the organization",
    examples: ["US"],
  }),
});

export const CreateOrgResponseSchema = t.Object({
  id: t.String({
    description: "The UUID of the organization",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
});

export type CreateOrgProps = Static<typeof CreateOrgSchema>;
export type CreateOrgResponse = Static<typeof CreateOrgResponseSchema>;

export const create = async (
  props: CreateOrgProps
): Promise<CreateOrgResponse | undefined> => {
  try {
    const org = await prisma.organization.create({
      data: {
        ...props,
      },
    });
    if (!org?.id) {
      return;
    }
    return {
      id: org.id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const UpdateOrgSchema = t.Composite([
  t.Object({
    id: t.String({
      description: "The UUID of the organization",
      examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
    }),
  }),
  CreateOrgSchema,
]);

export const UpdateOrgResponseSchema = t.Composite([
  UpdateOrgSchema,
  t.Object({
    status: t.Enum(OrgStatus, {
      description: "The status of the organization",
      examples: ["PENDING", "ACTIVE", "INACTIVE", "DELETED"],
    }),
  }),
]);

type UpdateOrgProps = Static<typeof UpdateOrgSchema>;
type UpdateOrgResponse = Static<typeof UpdateOrgResponseSchema>;

export const update = async ({
  id,
  ...props
}: UpdateOrgProps): Promise<UpdateOrgResponse | undefined> => {
  try {
    const org = await prisma.organization.update({
      where: {
        id,
      },
      data: {
        ...props,
      },
    });
    if (!org) {
      return;
    }
    return {
      id: org.id,
      alias: org.alias,
      name: org.name,
      phone: org.phone,
      email: org.email,
      address: org.address,
      country: org.country,
      status: org.status as OrgStatus,
    };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteOrgSchema = t.Object({
  id: t.String({
    description: "The UUID of the organization",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
});

export const DeleteOrgResponseSchema = t.Object({
  status: t.Number({
    description: "The status of the organization",
    examples: [200],
  }),
  message: t.String({
    description: "The message of the organization",
    examples: ["Organization deleted successfully"],
  }),
});

type DeleteOrgProps = Static<typeof DeleteOrgSchema>;
type DeleteOrgResponse = Static<typeof DeleteOrgResponseSchema>;

export const remove = async ({
  id,
}: DeleteOrgProps): Promise<DeleteOrgResponse | undefined> => {
  try {
    const org = await prisma.organization.update({
      where: {
        id,
      },
      data: {
        status: OrgStatus.DELETED,
      },
    });
    if (!org) {
      return;
    }
    return {
      status: 200,
      message: "Organization deleted successfully",
    };
  } catch (error) {
    console.log(error);
  }
};

export const GetOrgSchema = t.Object({
  id: t.String({
    description: "The UUID of the organization",
    examples: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
  }),
});

export const GetOrgResponseSchema = t.Composite([UpdateOrgResponseSchema]);

type GetOrgProps = Static<typeof GetOrgSchema>;
type GetOrgResponse = Static<typeof GetOrgResponseSchema>;
export const get = async ({
  id,
}: GetOrgProps): Promise<GetOrgResponse | undefined> => {
  try {
    const org = await prisma.organization.findFirst({
      where: {
        id,
      },
    });
    if (!org) {
      return;
    }
    return {
      id: org.id,
      alias: org.alias,
      name: org.name,
      phone: org.phone,
      email: org.email,
      address: org.address,
      country: org.country,
      status: org.status as OrgStatus,
    };
  } catch (error) {
    console.log(error);
  }
};
