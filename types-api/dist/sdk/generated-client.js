"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserClient = exports.createStoreClient = exports.createPetClient = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const core_1 = require("@zodios/core");
const zod_1 = require("zod");
const utils_1 = require("./utils");
const qs_1 = __importDefault(require("qs"));
const petEndpoints = (0, core_1.makeApi)([
    {
        method: "post",
        path: "/pet/:petId/uploadImage",
        alias: "uploadFile",
        requestFormat: "json",
        parameters: [
            {
                name: "petId",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
    },
    {
        method: "post",
        path: "/pet",
        alias: "addPet",
        requestFormat: "json",
        response: zod_1.z.void(),
        errors: [
            {
                status: 405,
                description: `Invalid input`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "put",
        path: "/pet",
        alias: "updatePet",
        requestFormat: "json",
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid ID supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `Pet not found`,
                schema: zod_1.z.void(),
            },
            {
                status: 405,
                description: `Validation exception`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "get",
        path: "/pet/findByStatus",
        alias: "findPetsByStatus",
        description: `Multiple status values can be provided with comma separated strings`,
        requestFormat: "json",
        parameters: [
            {
                name: "status",
                type: "Query",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid status value`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "get",
        path: "/pet/:petId",
        alias: "getPetById",
        description: `Returns a single pet`,
        requestFormat: "json",
        parameters: [
            {
                name: "petId",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid ID supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `Pet not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "post",
        path: "/pet/:petId",
        alias: "updatePetWithForm",
        requestFormat: "json",
        parameters: [
            {
                name: "petId",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 405,
                description: `Invalid input`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "delete",
        path: "/pet/:petId",
        alias: "deletePet",
        requestFormat: "json",
        parameters: [
            {
                name: "api_key",
                type: "Header",
                schema: zod_1.z.unknown().optional(),
            },
            {
                name: "petId",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid ID supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `Pet not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
]);
const petZodios = (baseUrl, options) => new core_1.Zodios(baseUrl, petEndpoints, options);
function createPetClient(options = { validate: "request" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = (0, utils_1.getApiUrl)();
        const client = petZodios(apiUrl, Object.assign({ axiosConfig: {
                paramsSerializer: {
                    serialize: (params) => qs_1.default.stringify(params, { arrayFormat: "repeat" }),
                },
            } }, options));
        return (0, utils_1.remapApiClient)(client);
    });
}
exports.createPetClient = createPetClient;
const storeEndpoints = (0, core_1.makeApi)([
    {
        method: "post",
        path: "/store/order",
        alias: "placeOrder",
        requestFormat: "json",
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid Order`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "get",
        path: "/store/order/:orderId",
        alias: "getOrderById",
        description: `For valid response try integer IDs with value &gt;&#x3D; 1 and &lt;&#x3D; 10. Other values will generated exceptions`,
        requestFormat: "json",
        parameters: [
            {
                name: "orderId",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid ID supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `Order not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "delete",
        path: "/store/order/:orderId",
        alias: "deleteOrder",
        description: `For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors`,
        requestFormat: "json",
        parameters: [
            {
                name: "orderId",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid ID supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `Order not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "get",
        path: "/store/inventory",
        alias: "getInventory",
        description: `Returns a map of status codes to quantities`,
        requestFormat: "json",
        response: zod_1.z.void(),
    },
]);
const storeZodios = (baseUrl, options) => new core_1.Zodios(baseUrl, storeEndpoints, options);
function createStoreClient(options = { validate: "request" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = (0, utils_1.getApiUrl)();
        const client = storeZodios(apiUrl, Object.assign({ axiosConfig: {
                paramsSerializer: {
                    serialize: (params) => qs_1.default.stringify(params, { arrayFormat: "repeat" }),
                },
            } }, options));
        return (0, utils_1.remapApiClient)(client);
    });
}
exports.createStoreClient = createStoreClient;
const userEndpoints = (0, core_1.makeApi)([
    {
        method: "post",
        path: "/user/createWithArray",
        alias: "createUsersWithArrayInput",
        requestFormat: "json",
        response: zod_1.z.void(),
    },
    {
        method: "post",
        path: "/user/createWithList",
        alias: "createUsersWithListInput",
        requestFormat: "json",
        response: zod_1.z.void(),
    },
    {
        method: "get",
        path: "/user/:username",
        alias: "getUserByName",
        requestFormat: "json",
        parameters: [
            {
                name: "username",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid username supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `User not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "put",
        path: "/user/:username",
        alias: "updateUser",
        description: `This can only be done by the logged in user.`,
        requestFormat: "json",
        parameters: [
            {
                name: "username",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid user supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `User not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "delete",
        path: "/user/:username",
        alias: "deleteUser",
        description: `This can only be done by the logged in user.`,
        requestFormat: "json",
        parameters: [
            {
                name: "username",
                type: "Path",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid username supplied`,
                schema: zod_1.z.void(),
            },
            {
                status: 404,
                description: `User not found`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "get",
        path: "/user/login",
        alias: "loginUser",
        requestFormat: "json",
        parameters: [
            {
                name: "username",
                type: "Query",
                schema: zod_1.z.unknown(),
            },
            {
                name: "password",
                type: "Query",
                schema: zod_1.z.unknown(),
            },
        ],
        response: zod_1.z.void(),
        errors: [
            {
                status: 400,
                description: `Invalid username/password supplied`,
                schema: zod_1.z.void(),
            },
        ],
    },
    {
        method: "get",
        path: "/user/logout",
        alias: "logoutUser",
        requestFormat: "json",
        response: zod_1.z.void(),
    },
    {
        method: "post",
        path: "/user",
        alias: "createUser",
        description: `This can only be done by the logged in user.`,
        requestFormat: "json",
        response: zod_1.z.void(),
    },
]);
const userZodios = (baseUrl, options) => new core_1.Zodios(baseUrl, userEndpoints, options);
function createUserClient(options = { validate: "request" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = (0, utils_1.getApiUrl)();
        const client = userZodios(apiUrl, Object.assign({ axiosConfig: {
                paramsSerializer: {
                    serialize: (params) => qs_1.default.stringify(params, { arrayFormat: "repeat" }),
                },
            } }, options));
        return (0, utils_1.remapApiClient)(client);
    });
}
exports.createUserClient = createUserClient;
