"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandlebars = exports.remapApiClient = exports.getApiUrl = void 0;
const handlebars_1 = require("handlebars");
function getApiUrl() {
    return `https://petstore.swagger.io/v2`;
}
exports.getApiUrl = getApiUrl;
function remapApiClient(client) {
    // all the "any" types in this function are because of the way the generated client is typed,
    // and we can't use strict typing without an explicit reference to a generated client instance.
    // const autocioClientId = getDefaultClientId();
    return client.api.reduce((acc, key) => {
        const { alias, parameters = [], method } = key;
        if (!alias)
            return acc;
        const typedAlias = alias;
        const ogMethod = client[typedAlias];
        const newMethod = (params, options = {}) => {
            const zodiosParams = Object.assign({ params: {}, queries: {}, body: {} }, options);
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
        acc[typedAlias] = newMethod;
        return acc;
    }, {});
}
exports.remapApiClient = remapApiClient;
function getHandlebars() {
    const instance = (0, handlebars_1.create)();
    instance.registerHelper("ifeq", function (a, b, options) {
        if (a === b) {
            // @ts-expect-error - this is a handlebars thing
            return options.fn(this);
        }
        // @ts-expect-error - this is a handlebars thing
        return options.inverse(this);
    });
    instance.registerHelper("ifNotEmptyObj", function (obj, options) {
        if (typeof obj === "object" && Object.keys(obj).length > 0) {
            // @ts-expect-error - this is a handlebars thing
            return options.fn(this);
        }
        // @ts-expect-error - this is a handlebars thing
        return options.inverse(this);
    });
    instance.registerHelper("capitalize", (str) => str.charAt(0).toUpperCase() + str.slice(1));
    return instance;
}
exports.getHandlebars = getHandlebars;
