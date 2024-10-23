// package: organization
// file: organization.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as organization_pb from "./organization_pb";

interface IOrganizationServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createOrganization: IOrganizationServiceService_ICreateOrganization;
}

interface IOrganizationServiceService_ICreateOrganization extends grpc.MethodDefinition<organization_pb.CreateOrganizationRequest, organization_pb.CreateOrganizationResponse> {
    path: "/organization.OrganizationService/CreateOrganization";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<organization_pb.CreateOrganizationRequest>;
    requestDeserialize: grpc.deserialize<organization_pb.CreateOrganizationRequest>;
    responseSerialize: grpc.serialize<organization_pb.CreateOrganizationResponse>;
    responseDeserialize: grpc.deserialize<organization_pb.CreateOrganizationResponse>;
}

export const OrganizationServiceService: IOrganizationServiceService;

export interface IOrganizationServiceServer extends grpc.UntypedServiceImplementation {
    createOrganization: grpc.handleUnaryCall<organization_pb.CreateOrganizationRequest, organization_pb.CreateOrganizationResponse>;
}

export interface IOrganizationServiceClient {
    createOrganization(request: organization_pb.CreateOrganizationRequest, callback: (error: grpc.ServiceError | null, response: organization_pb.CreateOrganizationResponse) => void): grpc.ClientUnaryCall;
    createOrganization(request: organization_pb.CreateOrganizationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organization_pb.CreateOrganizationResponse) => void): grpc.ClientUnaryCall;
    createOrganization(request: organization_pb.CreateOrganizationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organization_pb.CreateOrganizationResponse) => void): grpc.ClientUnaryCall;
}

export class OrganizationServiceClient extends grpc.Client implements IOrganizationServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createOrganization(request: organization_pb.CreateOrganizationRequest, callback: (error: grpc.ServiceError | null, response: organization_pb.CreateOrganizationResponse) => void): grpc.ClientUnaryCall;
    public createOrganization(request: organization_pb.CreateOrganizationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organization_pb.CreateOrganizationResponse) => void): grpc.ClientUnaryCall;
    public createOrganization(request: organization_pb.CreateOrganizationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organization_pb.CreateOrganizationResponse) => void): grpc.ClientUnaryCall;
}
