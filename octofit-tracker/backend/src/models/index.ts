import mongoose, { Schema, type Model } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface ITeam extends mongoose.Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export interface IActivity extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  completedAt: Date;
}

export interface ILeaderboardEntry extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  points: number;
  updatedAt: Date;
}

export interface IWorkout extends mongoose.Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  description?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  createdAt: { type: Date, default: Date.now },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
