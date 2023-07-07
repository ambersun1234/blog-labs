FROM node:18 AS build_layer
ENV SCHEMA_LOCATION=./src/database/prisma/schema.prisma
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:18-alpine AS final_layer
COPY --from=build_layer /app/dist /dist
ENTRYPOINT [ "node", "/dist/server.js" ]