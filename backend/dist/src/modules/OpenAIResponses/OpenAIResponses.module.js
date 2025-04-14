"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../../database/prisma.module");
const OpenAIResponses_controller_1 = require("./OpenAIResponses.controller");
const OpenAIResponses_repository_1 = require("./OpenAIResponses.repository");
const OpenAIResponses_service_1 = require("./OpenAIResponses.service");
let OpenAIResponsesModule = class OpenAIResponsesModule {
};
exports.OpenAIResponsesModule = OpenAIResponsesModule;
exports.OpenAIResponsesModule = OpenAIResponsesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [OpenAIResponses_controller_1.OpenAIResponseController],
        providers: [OpenAIResponses_service_1.OpenAIResponsesService, OpenAIResponses_repository_1.OpenAIResponsesRepository],
    })
], OpenAIResponsesModule);
//# sourceMappingURL=OpenAIResponses.module.js.map