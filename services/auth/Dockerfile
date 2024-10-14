FROM oven/bun:latest
WORKDIR /usr/src/app
COPY package.json bun.lockb tsconfig.json ./
RUN bun install --frozen-lockfile

COPY src .
COPY prisma .

# install prisma
RUN bunx prisma generate

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
