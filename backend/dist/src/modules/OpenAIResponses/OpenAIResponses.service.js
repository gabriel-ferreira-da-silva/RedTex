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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIResponsesService = void 0;
const common_1 = require("@nestjs/common");
const OpenAIResponses_repository_1 = require("./OpenAIResponses.repository");
const openai_1 = require("openai");
const pdfParse = require("pdf-parse");
const CreateOpenAIResponse_dto_1 = require("./dto/CreateOpenAIResponse.dto");
const inference_1 = require("@huggingface/inference");
let OpenAIResponsesService = class OpenAIResponsesService {
    openAIResponseRepo;
    openai;
    constructor(openAIResponseRepo) {
        this.openAIResponseRepo = openAIResponseRepo;
        this.openai = new openai_1.default({
            baseURL: 'https://api.deepseek.com',
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async analyze(dto) {
        const buffer = Buffer.from(dto.body, 'base64');
        const extractedText = await this.extractTextFromPdf(buffer);
        console.log(extractedText);
        const client = new inference_1.InferenceClient(process.env.HF_ACCESS_TOKEN);
        const response = await client.chatCompletion({
            provider: "novita",
            model: "deepseek-ai/DeepSeek-V3-0324",
            messages: [
                {
                    role: "user",
                    content: `descreva de forma sucinta o seguinte texto retirado de um pdf fornecendo uma analise breve e relevante:\n\n${extractedText}`,
                },
            ],
        });
        const openAIResponse = new CreateOpenAIResponse_dto_1.CreateOpenAIResponseDto();
        openAIResponse.body = response.choices[0].message.content || '';
        openAIResponse.documentId = dto.documentId;
        return this.createOpenAIResponse(openAIResponse);
    }
    findAll() {
        return this.openAIResponseRepo.getAll();
    }
    createOpenAIResponse(dto) {
        return this.openAIResponseRepo.create(dto);
    }
    async extractTextFromPdf(buffer) {
        const data = await pdfParse(buffer);
        return data.text;
    }
};
exports.OpenAIResponsesService = OpenAIResponsesService;
exports.OpenAIResponsesService = OpenAIResponsesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [OpenAIResponses_repository_1.OpenAIResponsesRepository])
], OpenAIResponsesService);
//# sourceMappingURL=OpenAIResponses.service.js.map