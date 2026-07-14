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
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.UserModel.create({
        name: req.body.name ?? 'New User',
        email: req.body.email ?? 'user@example.com',
        role: req.body.role ?? 'member',
    });
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.TeamModel.find().populate('members').lean();
    res.json(teams);
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.TeamModel.create({
        name: req.body.name ?? 'New Team',
        members: req.body.members ?? [],
    });
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.ActivityModel.find().populate('userId').lean();
    res.json(activities);
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.ActivityModel.create({
        userId: req.body.userId,
        type: req.body.type ?? 'workout',
        durationMinutes: req.body.durationMinutes ?? 30,
        completedAt: req.body.completedAt ?? new Date(),
    });
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardModel.find().sort({ points: -1 }).lean();
    res.json(leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.WorkoutModel.find().lean();
    res.json(workouts);
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.WorkoutModel.create({
        title: req.body.title ?? 'New Workout',
        difficulty: req.body.difficulty ?? 'beginner',
        durationMinutes: req.body.durationMinutes ?? 20,
        description: req.body.description ?? 'A fresh workout for your routine.',
    });
    res.status(201).json(workout);
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
