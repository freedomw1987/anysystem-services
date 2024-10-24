FROM oven/bun:latest
WORKDIR /usr/src/app

COPY package.json bun.lockb tsconfig.json ./
COPY src .
COPY prisma .
RUN bun install --frozen-lockfile


# install prisma
RUN bunx prisma generate

# run the app

USER bun
EXPOSE 3000/tcp
EXPOSE 50051/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]

