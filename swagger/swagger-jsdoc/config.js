import swaggerJSDoc from "swagger-jsdoc";

export const option = swaggerJSDoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Swagger API Test",
      description:
        "This document shows how to use $ref in multiple swagger file",
      version: "1.0.0",
      servers: [
        {
          url: "http://localhost",
        },
      ],
    },
  },
  apis: ["./doc/**/*.yaml"],
});
