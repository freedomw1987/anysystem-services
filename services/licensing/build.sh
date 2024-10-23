#!/bin/bash
SOURCE_DIR="./proto"
DEST_DIR="./src/proto"

bunx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${DEST_DIR} \
  --grpc_out=grpc_js:${DEST_DIR} \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  -I ${SOURCE_DIR} \
  ${SOURCE_DIR}/*.proto

# generate d.ts codes
bunx protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:${DEST_DIR} \
  -I ${SOURCE_DIR} \
  ${SOURCE_DIR}/*.proto
