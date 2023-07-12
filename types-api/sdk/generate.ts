import { generateZodClientFromOpenAPI } from "openapi-zod-client";
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIObject, OperationObject } from "openapi3-ts";
import { resolveConfig } from "prettier";
import path from "path";
import { capitalize, kebabToCamel } from "pastable/server";
import { getHandlebars, getApiUrl } from "./utils";

async function generate() {
  const apiUrl = `${getApiUrl()}/openapi.json`;
  const openApiDoc = (await SwaggerParser.bundle(apiUrl)) as OpenAPIObject;
  const prettierConfig = await resolveConfig("./");
  const distPath = path.resolve(__dirname, "generated-client.ts");
  const template = path.resolve(__dirname, "template.hbs");

  await generateZodClientFromOpenAPI({
    openApiDoc,
    distPath,
    prettierConfig,
    templatePath: template,
    options: {
      withDefaultValues: false,
      withAlias: makeAlias,
      groupStrategy: "tag",
    },
    handlebars: getHandlebars(),
  });
  console.info("Generated client at", distPath);
}

function makeAlias(path: string, method: string, operation: OperationObject) {
  if (!operation) return "";
  const basePath = path;

  return operation.operationId
    ? lcFirst(operation.operationId.split("_").map(capitalize).join(""))
    : `${method}${pathToVariableName(basePath)}`;
}
const pathParamWithBracketsRegex = /({\w+})/g;

const pathToVariableName = (path: string) =>
  path
    .split("/")
    .map((part) =>
      capitalize(
        kebabToCamel(
          part
            .replace(pathParamWithBracketsRegex, (group) => group.slice(1, -1))
            .replace("_", "-")
        )
      )
    )
    .join("");
generate();

function lcFirst(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
