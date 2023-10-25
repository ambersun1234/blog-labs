const path = require("path");
const Dotenv = require("dotenv-webpack");
const JavaScriptObfuscator = require("webpack-obfuscator");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/server.ts",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: ["/node_modules/"],
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
      },
      ["exclude_bundle.js"]
    ),
    new Dotenv({
      systemvars: true,
      path: path.join(__dirname, "./.env"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/database/prisma/schema.prisma",
          to: "./schema.prisma",
        },
        {
          from: path.join(
            __dirname,
            "./node_modules/.prisma/client/query-engine-linux-musl-openssl-3.0.x"
          ),
          to: "./query-engine-linux-musl-openssl-3.0.x",
        },
        {
          from: path.join(
            __dirname,
            "./node_modules/.prisma/client/query-engine-debian-openssl-3.0.x"
          ),
          to: "./query-engine-debian-openssl-3.0.x",
        },
      ],
    }),
  ],
  output: {
    filename: "./server.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
