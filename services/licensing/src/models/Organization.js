"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.GetOrgResponseSchema = exports.GetOrgSchema = exports.remove = exports.DeleteOrgResponseSchema = exports.DeleteOrgSchema = exports.update = exports.UpdateOrgResponseSchema = exports.UpdateOrgSchema = exports.create = exports.CreateOrgResponseSchema = exports.CreateOrgSchema = void 0;
var client_1 = require("@prisma/client");
var elysia_1 = require("elysia");
var prisma = new client_1.PrismaClient();
exports.CreateOrgSchema = elysia_1.t.Object({
    alias: elysia_1.t.String({
        description: "The alias of the organization",
        examples: ["my-org"],
    }),
    name: elysia_1.t.String({
        description: "The name of the organization",
        examples: ["My Organization"],
    }),
    phone: elysia_1.t.String({
        description: "The phone number of the organization",
        examples: ["+853-66297530"],
    }),
    email: elysia_1.t.String({
        description: "The email of the organization",
        format: "email",
        examples: ["pQXt9@example.com"],
    }),
    address: elysia_1.t.String({
        description: "The address of the organization",
        examples: ["123 Main St, Anytown USA"],
    }),
    country: elysia_1.t.String({
        description: "The country of the organization",
        examples: ["US"],
    }),
});
exports.CreateOrgResponseSchema = elysia_1.t.Object({
    id: elysia_1.t.String({
        description: "The UUID of the organization",
        examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
    }),
});
var create = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    var org, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.organization.create({
                        data: __assign({}, props),
                    })];
            case 1:
                org = _a.sent();
                if (!(org === null || org === void 0 ? void 0 : org.id)) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, {
                        id: org.id,
                    }];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
exports.UpdateOrgSchema = elysia_1.t.Composite([
    elysia_1.t.Object({
        id: elysia_1.t.String({
            description: "The UUID of the organization",
            examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
        }),
    }),
    exports.CreateOrgSchema,
]);
exports.UpdateOrgResponseSchema = elysia_1.t.Composite([
    exports.UpdateOrgSchema,
    elysia_1.t.Object({
        status: elysia_1.t.Enum(client_1.OrgStatus, {
            description: "The status of the organization",
            examples: ["PENDING", "ACTIVE", "INACTIVE", "DELETED"],
        }),
    }),
]);
var update = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var org, error_2;
    var id = _a.id, props = __rest(_a, ["id"]);
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.organization.update({
                        where: {
                            id: id,
                        },
                        data: __assign({}, props),
                    })];
            case 1:
                org = _b.sent();
                if (!org) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, {
                        id: org.id,
                        alias: org.alias,
                        name: org.name,
                        phone: org.phone,
                        email: org.email,
                        address: org.address,
                        country: org.country,
                        status: org.status,
                    }];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
exports.DeleteOrgSchema = elysia_1.t.Object({
    id: elysia_1.t.String({
        description: "The UUID of the organization",
        examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
    }),
});
exports.DeleteOrgResponseSchema = elysia_1.t.Object({
    status: elysia_1.t.Number({
        description: "The status of the organization",
        examples: [200],
    }),
    message: elysia_1.t.String({
        description: "The message of the organization",
        examples: ["Organization deleted successfully"],
    }),
});
var remove = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var org, error_3;
    var id = _b.id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.organization.update({
                        where: {
                            id: id,
                        },
                        data: {
                            status: client_1.OrgStatus.DELETED,
                        },
                    })];
            case 1:
                org = _c.sent();
                if (!org) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, {
                        status: 200,
                        message: "Organization deleted successfully",
                    }];
            case 2:
                error_3 = _c.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
exports.GetOrgSchema = elysia_1.t.Object({
    id: elysia_1.t.String({
        description: "The UUID of the organization",
        examples: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    }),
});
exports.GetOrgResponseSchema = elysia_1.t.Composite([exports.UpdateOrgResponseSchema]);
var get = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var org, error_4;
    var id = _b.id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.organization.findFirst({
                        where: {
                            id: id,
                        },
                    })];
            case 1:
                org = _c.sent();
                if (!org) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, {
                        id: org.id,
                        alias: org.alias,
                        name: org.name,
                        phone: org.phone,
                        email: org.email,
                        address: org.address,
                        country: org.country,
                        status: org.status,
                    }];
            case 2:
                error_4 = _c.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get = get;
