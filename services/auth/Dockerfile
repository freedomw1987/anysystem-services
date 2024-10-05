FROM oven/bun:alpine 
WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY ./src .

# run the app
USER bun
EXPOSE 8000
ENTRYPOINT [ "bun", "run", "index.ts" ]
