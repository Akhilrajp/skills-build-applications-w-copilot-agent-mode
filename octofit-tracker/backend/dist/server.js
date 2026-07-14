"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};
exports.getApiBaseUrl = getApiBaseUrl;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: (0, exports.getApiBaseUrl)() });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.UserModel.find().lean();
    res.json(users);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.ActivityModel.find().populate('userId').lean();
    res.json(activities);
});
async function startServer() {
    await mongoose_1.default.connect(connectionString);
    console.log('Connected to octofit_db');
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
    });
}
startServer().catch((error) => {
    console.error('Error starting OctoFit backend:', error);
    process.exit(1);
});
