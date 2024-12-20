// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v5.28.2
// source: organization.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";

export const protobufPackage = "organization";

export enum OrgStatus {
  PENDING = 0,
  ACTIVE = 1,
  INACTIVE = 2,
  DELETED = 3,
  UNRECOGNIZED = -1,
}

export function orgStatusFromJSON(object: any): OrgStatus {
  switch (object) {
    case 0:
    case "PENDING":
      return OrgStatus.PENDING;
    case 1:
    case "ACTIVE":
      return OrgStatus.ACTIVE;
    case 2:
    case "INACTIVE":
      return OrgStatus.INACTIVE;
    case 3:
    case "DELETED":
      return OrgStatus.DELETED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrgStatus.UNRECOGNIZED;
  }
}

export function orgStatusToJSON(object: OrgStatus): string {
  switch (object) {
    case OrgStatus.PENDING:
      return "PENDING";
    case OrgStatus.ACTIVE:
      return "ACTIVE";
    case OrgStatus.INACTIVE:
      return "INACTIVE";
    case OrgStatus.DELETED:
      return "DELETED";
    case OrgStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateOrganizationRequest {
  alias: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  country: string;
}

export interface CreateOrganizationResponse {
  id: string;
}

export interface GetOrganizationRequest {
  id: string;
}

export interface DeleteOrganizationRequest {
  id: string;
}

export interface Organization {
  id: string;
  alias: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  status: OrgStatus;
}

export interface UpdateOrganizationRequest {
  id: string;
  name?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  address?: string | undefined;
  country?: string | undefined;
}

export interface DeleteOrganizationResponse {
  status: number;
  message: string;
}

function createBaseCreateOrganizationRequest(): CreateOrganizationRequest {
  return { alias: "", name: "", phone: "", email: "", address: "", country: "" };
}

export const CreateOrganizationRequest: MessageFns<CreateOrganizationRequest> = {
  encode(message: CreateOrganizationRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.alias !== "") {
      writer.uint32(10).string(message.alias);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.phone !== "") {
      writer.uint32(26).string(message.phone);
    }
    if (message.email !== "") {
      writer.uint32(34).string(message.email);
    }
    if (message.address !== "") {
      writer.uint32(42).string(message.address);
    }
    if (message.country !== "") {
      writer.uint32(50).string(message.country);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateOrganizationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.alias = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.phone = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.address = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.country = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrganizationRequest {
    return {
      alias: isSet(object.alias) ? globalThis.String(object.alias) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      phone: isSet(object.phone) ? globalThis.String(object.phone) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      country: isSet(object.country) ? globalThis.String(object.country) : "",
    };
  },

  toJSON(message: CreateOrganizationRequest): unknown {
    const obj: any = {};
    if (message.alias !== "") {
      obj.alias = message.alias;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.country !== "") {
      obj.country = message.country;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrganizationRequest>, I>>(base?: I): CreateOrganizationRequest {
    return CreateOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrganizationRequest>, I>>(object: I): CreateOrganizationRequest {
    const message = createBaseCreateOrganizationRequest();
    message.alias = object.alias ?? "";
    message.name = object.name ?? "";
    message.phone = object.phone ?? "";
    message.email = object.email ?? "";
    message.address = object.address ?? "";
    message.country = object.country ?? "";
    return message;
  },
};

function createBaseCreateOrganizationResponse(): CreateOrganizationResponse {
  return { id: "" };
}

export const CreateOrganizationResponse: MessageFns<CreateOrganizationResponse> = {
  encode(message: CreateOrganizationResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateOrganizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrganizationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrganizationResponse {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: CreateOrganizationResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrganizationResponse>, I>>(base?: I): CreateOrganizationResponse {
    return CreateOrganizationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrganizationResponse>, I>>(object: I): CreateOrganizationResponse {
    const message = createBaseCreateOrganizationResponse();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetOrganizationRequest(): GetOrganizationRequest {
  return { id: "" };
}

export const GetOrganizationRequest: MessageFns<GetOrganizationRequest> = {
  encode(message: GetOrganizationRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetOrganizationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOrganizationRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetOrganizationRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOrganizationRequest>, I>>(base?: I): GetOrganizationRequest {
    return GetOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOrganizationRequest>, I>>(object: I): GetOrganizationRequest {
    const message = createBaseGetOrganizationRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeleteOrganizationRequest(): DeleteOrganizationRequest {
  return { id: "" };
}

export const DeleteOrganizationRequest: MessageFns<DeleteOrganizationRequest> = {
  encode(message: DeleteOrganizationRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteOrganizationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteOrganizationRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteOrganizationRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteOrganizationRequest>, I>>(base?: I): DeleteOrganizationRequest {
    return DeleteOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteOrganizationRequest>, I>>(object: I): DeleteOrganizationRequest {
    const message = createBaseDeleteOrganizationRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrganization(): Organization {
  return { id: "", alias: "", name: "", phone: "", email: "", address: "", country: "", status: 0 };
}

export const Organization: MessageFns<Organization> = {
  encode(message: Organization, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.alias !== "") {
      writer.uint32(18).string(message.alias);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.phone !== "") {
      writer.uint32(34).string(message.phone);
    }
    if (message.email !== "") {
      writer.uint32(42).string(message.email);
    }
    if (message.address !== "") {
      writer.uint32(50).string(message.address);
    }
    if (message.country !== "") {
      writer.uint32(58).string(message.country);
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Organization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrganization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.alias = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.phone = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.address = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.country = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Organization {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      alias: isSet(object.alias) ? globalThis.String(object.alias) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      phone: isSet(object.phone) ? globalThis.String(object.phone) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      country: isSet(object.country) ? globalThis.String(object.country) : "",
      status: isSet(object.status) ? orgStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Organization): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.alias !== "") {
      obj.alias = message.alias;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.country !== "") {
      obj.country = message.country;
    }
    if (message.status !== 0) {
      obj.status = orgStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Organization>, I>>(base?: I): Organization {
    return Organization.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Organization>, I>>(object: I): Organization {
    const message = createBaseOrganization();
    message.id = object.id ?? "";
    message.alias = object.alias ?? "";
    message.name = object.name ?? "";
    message.phone = object.phone ?? "";
    message.email = object.email ?? "";
    message.address = object.address ?? "";
    message.country = object.country ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseUpdateOrganizationRequest(): UpdateOrganizationRequest {
  return { id: "", name: undefined, phone: undefined, email: undefined, address: undefined, country: undefined };
}

export const UpdateOrganizationRequest: MessageFns<UpdateOrganizationRequest> = {
  encode(message: UpdateOrganizationRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.phone !== undefined) {
      writer.uint32(26).string(message.phone);
    }
    if (message.email !== undefined) {
      writer.uint32(34).string(message.email);
    }
    if (message.address !== undefined) {
      writer.uint32(42).string(message.address);
    }
    if (message.country !== undefined) {
      writer.uint32(50).string(message.country);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateOrganizationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.phone = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.address = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.country = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateOrganizationRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      phone: isSet(object.phone) ? globalThis.String(object.phone) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
      address: isSet(object.address) ? globalThis.String(object.address) : undefined,
      country: isSet(object.country) ? globalThis.String(object.country) : undefined,
    };
  },

  toJSON(message: UpdateOrganizationRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.phone !== undefined) {
      obj.phone = message.phone;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.country !== undefined) {
      obj.country = message.country;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOrganizationRequest>, I>>(base?: I): UpdateOrganizationRequest {
    return UpdateOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOrganizationRequest>, I>>(object: I): UpdateOrganizationRequest {
    const message = createBaseUpdateOrganizationRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? undefined;
    message.phone = object.phone ?? undefined;
    message.email = object.email ?? undefined;
    message.address = object.address ?? undefined;
    message.country = object.country ?? undefined;
    return message;
  },
};

function createBaseDeleteOrganizationResponse(): DeleteOrganizationResponse {
  return { status: 0, message: "" };
}

export const DeleteOrganizationResponse: MessageFns<DeleteOrganizationResponse> = {
  encode(message: DeleteOrganizationResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteOrganizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrganizationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteOrganizationResponse {
    return {
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: DeleteOrganizationResponse): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteOrganizationResponse>, I>>(base?: I): DeleteOrganizationResponse {
    return DeleteOrganizationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteOrganizationResponse>, I>>(object: I): DeleteOrganizationResponse {
    const message = createBaseDeleteOrganizationResponse();
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

export type OrganizationServiceService = typeof OrganizationServiceService;
export const OrganizationServiceService = {
  createOrganization: {
    path: "/organization.OrganizationService/CreateOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateOrganizationRequest) =>
      Buffer.from(CreateOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateOrganizationRequest.decode(value),
    responseSerialize: (value: CreateOrganizationResponse) =>
      Buffer.from(CreateOrganizationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateOrganizationResponse.decode(value),
  },
  getOrganization: {
    path: "/organization.OrganizationService/GetOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetOrganizationRequest) => Buffer.from(GetOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetOrganizationRequest.decode(value),
    responseSerialize: (value: Organization) => Buffer.from(Organization.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Organization.decode(value),
  },
  updateOrganization: {
    path: "/organization.OrganizationService/UpdateOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateOrganizationRequest) =>
      Buffer.from(UpdateOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateOrganizationRequest.decode(value),
    responseSerialize: (value: Organization) => Buffer.from(Organization.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Organization.decode(value),
  },
  deleteOrganization: {
    path: "/organization.OrganizationService/DeleteOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteOrganizationRequest) =>
      Buffer.from(DeleteOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteOrganizationRequest.decode(value),
    responseSerialize: (value: DeleteOrganizationResponse) =>
      Buffer.from(DeleteOrganizationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteOrganizationResponse.decode(value),
  },
} as const;

export interface OrganizationServiceServer extends UntypedServiceImplementation {
  createOrganization: handleUnaryCall<CreateOrganizationRequest, CreateOrganizationResponse>;
  getOrganization: handleUnaryCall<GetOrganizationRequest, Organization>;
  updateOrganization: handleUnaryCall<UpdateOrganizationRequest, Organization>;
  deleteOrganization: handleUnaryCall<DeleteOrganizationRequest, DeleteOrganizationResponse>;
}

export interface OrganizationServiceClient extends Client {
  createOrganization(
    request: CreateOrganizationRequest,
    callback: (error: ServiceError | null, response: CreateOrganizationResponse) => void,
  ): ClientUnaryCall;
  createOrganization(
    request: CreateOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateOrganizationResponse) => void,
  ): ClientUnaryCall;
  createOrganization(
    request: CreateOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateOrganizationResponse) => void,
  ): ClientUnaryCall;
  getOrganization(
    request: GetOrganizationRequest,
    callback: (error: ServiceError | null, response: Organization) => void,
  ): ClientUnaryCall;
  getOrganization(
    request: GetOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Organization) => void,
  ): ClientUnaryCall;
  getOrganization(
    request: GetOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Organization) => void,
  ): ClientUnaryCall;
  updateOrganization(
    request: UpdateOrganizationRequest,
    callback: (error: ServiceError | null, response: Organization) => void,
  ): ClientUnaryCall;
  updateOrganization(
    request: UpdateOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Organization) => void,
  ): ClientUnaryCall;
  updateOrganization(
    request: UpdateOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Organization) => void,
  ): ClientUnaryCall;
  deleteOrganization(
    request: DeleteOrganizationRequest,
    callback: (error: ServiceError | null, response: DeleteOrganizationResponse) => void,
  ): ClientUnaryCall;
  deleteOrganization(
    request: DeleteOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteOrganizationResponse) => void,
  ): ClientUnaryCall;
  deleteOrganization(
    request: DeleteOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteOrganizationResponse) => void,
  ): ClientUnaryCall;
}

export const OrganizationServiceClient = makeGenericClientConstructor(
  OrganizationServiceService,
  "organization.OrganizationService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): OrganizationServiceClient;
  service: typeof OrganizationServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
