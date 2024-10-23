// package: organization
// file: organization.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateOrganizationRequest extends jspb.Message { 
    getAlias(): string;
    setAlias(value: string): CreateOrganizationRequest;
    getName(): string;
    setName(value: string): CreateOrganizationRequest;
    getPhone(): string;
    setPhone(value: string): CreateOrganizationRequest;
    getEmail(): string;
    setEmail(value: string): CreateOrganizationRequest;
    getAddress(): string;
    setAddress(value: string): CreateOrganizationRequest;
    getCountry(): string;
    setCountry(value: string): CreateOrganizationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOrganizationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateOrganizationRequest): CreateOrganizationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateOrganizationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateOrganizationRequest;
    static deserializeBinaryFromReader(message: CreateOrganizationRequest, reader: jspb.BinaryReader): CreateOrganizationRequest;
}

export namespace CreateOrganizationRequest {
    export type AsObject = {
        alias: string,
        name: string,
        phone: string,
        email: string,
        address: string,
        country: string,
    }
}

export class CreateOrganizationResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): CreateOrganizationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOrganizationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateOrganizationResponse): CreateOrganizationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateOrganizationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateOrganizationResponse;
    static deserializeBinaryFromReader(message: CreateOrganizationResponse, reader: jspb.BinaryReader): CreateOrganizationResponse;
}

export namespace CreateOrganizationResponse {
    export type AsObject = {
        id: string,
    }
}
