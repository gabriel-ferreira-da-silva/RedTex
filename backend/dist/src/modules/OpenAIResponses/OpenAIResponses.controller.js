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
exports.OpenAIResponseController = void 0;
const common_1 = require("@nestjs/common");
const OpenAIResponses_service_1 = require("./OpenAIResponses.service");
const OpenAIResponse_dto_1 = require("./dto/OpenAIResponse.dto");
const OpenAIRequest_dto_1 = require("./dto/OpenAIRequest.dto");
let OpenAIResponseController = class OpenAIResponseController {
    OpenAIResponsesService;
    constructor(OpenAIResponsesService) {
        this.OpenAIResponsesService = OpenAIResponsesService;
    }
    findAll() {
        return this.OpenAIResponsesService.findAll();
    }
    create(body) {
        return this.OpenAIResponsesService.createOpenAIResponse(body);
    }
    analyze(body) {
        return this.OpenAIResponsesService.analyze(body);
    }
};
exports.OpenAIResponseController = OpenAIResponseController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OpenAIResponseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OpenAIResponse_dto_1.OpenAIResponseDto]),
    __metadata("design:returntype", void 0)
], OpenAIResponseController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/analyze"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OpenAIRequest_dto_1.OpenAIRequestDto]),
    __metadata("design:returntype", Promise)
], OpenAIResponseController.prototype, "analyze", null);
exports.OpenAIResponseController = OpenAIResponseController = __decorate([
    (0, common_1.Controller)('openairesponse'),
    __metadata("design:paramtypes", [OpenAIResponses_service_1.OpenAIResponsesService])
], OpenAIResponseController);
//# sourceMappingURL=OpenAIResponses.controller.js.map