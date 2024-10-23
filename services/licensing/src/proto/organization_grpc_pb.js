// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var organization_pb = require('./organization_pb.js');

function serialize_organization_CreateOrganizationRequest(arg) {
  if (!(arg instanceof organization_pb.CreateOrganizationRequest)) {
    throw new Error('Expected argument of type organization.CreateOrganizationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organization_CreateOrganizationRequest(buffer_arg) {
  return organization_pb.CreateOrganizationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organization_CreateOrganizationResponse(arg) {
  if (!(arg instanceof organization_pb.CreateOrganizationResponse)) {
    throw new Error('Expected argument of type organization.CreateOrganizationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organization_CreateOrganizationResponse(buffer_arg) {
  return organization_pb.CreateOrganizationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var OrganizationServiceService = exports.OrganizationServiceService = {
  createOrganization: {
    path: '/organization.OrganizationService/CreateOrganization',
    requestStream: false,
    responseStream: false,
    requestType: organization_pb.CreateOrganizationRequest,
    responseType: organization_pb.CreateOrganizationResponse,
    requestSerialize: serialize_organization_CreateOrganizationRequest,
    requestDeserialize: deserialize_organization_CreateOrganizationRequest,
    responseSerialize: serialize_organization_CreateOrganizationResponse,
    responseDeserialize: deserialize_organization_CreateOrganizationResponse,
  },
};

exports.OrganizationServiceClient = grpc.makeGenericClientConstructor(OrganizationServiceService);
