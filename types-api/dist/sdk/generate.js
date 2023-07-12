"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const openapi_zod_client_1 = require("openapi-zod-client");
const swagger_parser_1 = __importDefault(
  require("@apidevtools/swagger-parser")
);
const prettier_1 = require("prettier");
const path_1 = __importDefault(require("path"));
const server_1 = require("pastable/server");
const utils_1 = require("./utils");
function generate() {
  return __awaiter(this, void 0, void 0, function* () {
    const apiUrl = `${(0, utils_1.getApiUrl)()}/swagger.json`;
    const openApiDoc = yield swagger_parser_1.default.bundle(apiUrl);
    // uncomment this line to generate from local file intead of remote
    // const openApiDoc = (await SwaggerParser.bundle(path.resolve(__dirname, 'autocio-api-schema.json'))) as OpenAPIObject;
    const prettierConfig = yield (0, prettier_1.resolveConfig)("./");
    const distPath = path_1.default.resolve(__dirname, "generated-client.ts");
    const template = path_1.default.resolve(__dirname, "template.hbs");
    yield (0, openapi_zod_client_1.generateZodClientFromOpenAPI)({
      openApiDoc,
      distPath,
      prettierConfig,
      templatePath: template,
      options: {
        withDefaultValues: false,
        withAlias: makeAlias,
        groupStrategy: "tag",
      },
      handlebars: (0, utils_1.getHandlebars)(),
    });
    console.info("Generated client at", distPath);
  });
}
function makeAlias(path, method, operation) {
  if (!operation) return "";
  const basePath = path; //.replace("/autocio/v1/", "");
  return operation.operationId
    ? lcFirst(
        operation.operationId.split("_").map(server_1.capitalize).join("")
      )
    : `${method}${pathToVariableName(basePath)}`;
}
const pathParamWithBracketsRegex = /({\w+})/g;
const pathToVariableName = (path) =>
  path
    .split("/")
    .map((part) =>
      (0, server_1.capitalize)(
        (0, server_1.kebabToCamel)(
          part
            .replace(pathParamWithBracketsRegex, (group) => group.slice(1, -1))
            .replace("_", "-")
        )
      )
    )
    .join("");
generate();
function lcFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
