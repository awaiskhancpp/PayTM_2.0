"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prismaClientSingleton = function () {
    console.log(process.env.DATABASE_URL);
    return new client_1.PrismaClient();
};
var prisma = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prisma;
