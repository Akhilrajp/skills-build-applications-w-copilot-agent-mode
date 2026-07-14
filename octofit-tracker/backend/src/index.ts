import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

export const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  const users = await UserModel.find().lean();
  res.json(users);
});

app.post(['/api/users', '/api/users/'], async (req: Request, res: Response) => {
  const user = await UserModel.create({
    name: req.body.name ?? 'New User',
    email: req.body.email ?? 'user@example.com',
    role: req.body.role ?? 'member',
  });

  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  const teams = await TeamModel.find().populate('members').lean();
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], async (req: Request, res: Response) => {
  const team = await TeamModel.create({
    name: req.body.name ?? 'New Team',
    members: req.body.members ?? [],
  });

  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find().populate('userId').lean();
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], async (req: Request, res: Response) => {
  const activity = await ActivityModel.create({
    userId: req.body.userId,
    type: req.body.type ?? 'workout',
    durationMinutes: req.body.durationMinutes ?? 30,
    completedAt: req.body.completedAt ?? new Date(),
  });

  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find().sort({ points: -1 }).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  const workouts = await WorkoutModel.find().lean();
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req: Request, res: Response) => {
  const workout = await WorkoutModel.create({
    title: req.body.title ?? 'New Workout',
    difficulty: req.body.difficulty ?? 'beginner',
    durationMinutes: req.body.durationMinutes ?? 20,
    description: req.body.description ?? 'A fresh workout for your routine.',
  });

  res.status(201).json(workout);
});

async function startServer() {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting OctoFit backend:', error);
  process.exit(1);
});
