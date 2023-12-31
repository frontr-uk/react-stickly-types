"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cat_service_1 = require("./cat.service");
const common_1 = require("@nestjs/common");
let CatResolver = exports.CatResolver = class CatResolver {
    constructor(catService) {
        this.catService = catService;
    }
    async getCats() {
        console.log('got cats');
        return this.catService.findAll();
    }
    async findOneById(id) {
        console.error('dd', id);
        return this.catService.findOneById(id);
    }
};
__decorate([
    (0, graphql_1.Query)('cats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatResolver.prototype, "getCats", null);
__decorate([
    (0, graphql_1.Query)('cat'),
    __param(0, (0, graphql_1.Args)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatResolver.prototype, "findOneById", null);
exports.CatResolver = CatResolver = __decorate([
    (0, graphql_1.Resolver)('Cat'),
    __metadata("design:paramtypes", [cat_service_1.CatService])
], CatResolver);
//# sourceMappingURL=cat.resolver.js.map