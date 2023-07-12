import {
  ZodiosBodyByAlias,
  ZodiosEndpointDefinitions,
  ZodiosInstance,
  ZodiosPathParamByAlias,
  ZodiosQueryParamsByAlias,
  ZodiosResponseByAlias,
} from "@zodios/core";
import { AxiosRequestConfig } from "axios";

export function getApiUrl() {
  return `https://petstore3.swagger.io/api/v3`;
}

export type RemappedApi<API extends ZodiosEndpointDefinitions> = {
  [K in NonNullable<API[number]["alias"]>]: (
    params: { "client-id"?: string } & (ZodiosPathParamByAlias<
      API,
      K
    > extends never
      ? unknown
      : ZodiosPathParamByAlias<API, K>) &
      (ZodiosQueryParamsByAlias<API, K> extends never
        ? unknown
        : ZodiosQueryParamsByAlias<API, K>) &
      (ZodiosBodyByAlias<API, K> extends never
        ? unknown
        : { body: ZodiosBodyByAlias<API, K> }),
    options?: Omit<
      AxiosRequestConfig,
      "params" | "baseURL" | "data" | "method" | "url"
    >
  ) => Promise<ZodiosResponseByAlias<API, K>>;
};

export function remapApiClient<
  API extends ZodiosEndpointDefinitions,
  T extends ZodiosInstance<API> = ZodiosInstance<API>
>(client: T): RemappedApi<API> {
  // all the "any" types in this function are because of the way the generated client is typed,
  // and we can't use strict typing without an explicit reference to a generated client instance.
  return client.api.reduce((acc, key) => {
    const { alias, parameters = [], method } = key;
    if (!alias) return acc;
    const typedAlias = alias as NonNullable<API[number]["alias"]>;
    const ogMethod = (client as any)[typedAlias];
    const newMethod = (params: any, options = {}) => {
      const zodiosParams = {
        params: {},
        queries: {},
        body: {},
        ...options,
      } as any;
      parameters.forEach((param) => {
        switch (param.type) {
          case "Path":
            zodiosParams.params[param.name] = params[param.name];
            break;
          case "Query":
            zodiosParams.queries[param.name] = params[param.name];
            break;
          case "Body":
            zodiosParams.body = params[param.name];
            break;
          default:
        }
      });
      return method === "get"
        ? ogMethod(zodiosParams)
        : ogMethod(zodiosParams.body, zodiosParams);
    };
    acc[typedAlias] = newMethod as any;
    return acc;
  }, {} as RemappedApi<API>);
}

// export function getHandlebars() {
//   const instance = createHandlebars();
//   instance.registerHelper(
//     "ifeq",
//     function (a: string, b: string, options: HelperOptions) {
//       if (a === b) {
//         // @ts-expect-error - this is a handlebars thing
//         return options.fn(this);
//       }

//       // @ts-expect-error - this is a handlebars thing
//       return options.inverse(this);
//     }
//   );
//   instance.registerHelper(
//     "ifNotEmptyObj",
//     function (obj: Record<string, any>, options: HelperOptions) {
//       if (typeof obj === "object" && Object.keys(obj).length > 0) {
//         // @ts-expect-error - this is a handlebars thing
//         return options.fn(this);
//       }

//       // @ts-expect-error - this is a handlebars thing
//       return options.inverse(this);
//     }
//   );
//   instance.registerHelper(
//     "capitalize",
//     (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
//   );

//   return instance;
// }
