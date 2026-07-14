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

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find().populate('userId').lean();
  res.json(activities);
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
