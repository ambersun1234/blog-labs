import swaggerCombine from "swagger-combine";

export const option = await swaggerCombine("./doc/api.yaml");
