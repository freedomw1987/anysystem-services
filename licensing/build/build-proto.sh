#!/bin/bash
SOURCE_DIR="./proto"
DEST_DIR="./src/proto"

bunx protoc \
  --ts_proto_out=${DEST_DIR} \
  --ts_proto_opt=outputServices=grpc-js \
  --ts_proto_opt=esModuleInterop=true \
  -I ${SOURCE_DIR} \
  ${SOURCE_DIR}/*.proto
