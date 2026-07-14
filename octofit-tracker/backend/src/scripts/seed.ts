import mongoose from 'mongoose';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain' },
      { name: 'Noah Brooks', email: 'noah.brooks@example.com', role: 'member' },
      { name: 'Mina Chen', email: 'mina.chen@example.com', role: 'coach' },
    ]);

    const teams = await TeamModel.insertMany([
      { name: 'North Stars', members: [users[0]._id, users[1]._id] },
      { name: 'River Runners', members: [users[2]._id] },
    ]);

    const activities = await ActivityModel.insertMany([
      { userId: users[0]._id, type: 'run', durationMinutes: 35, completedAt: new Date('2026-07-12T07:10:00.000Z') },
      { userId: users[1]._id, type: 'cycling', durationMinutes: 45, completedAt: new Date('2026-07-13T06:45:00.000Z') },
      { userId: users[2]._id, type: 'yoga', durationMinutes: 30, completedAt: new Date('2026-07-14T05:30:00.000Z') },
    ]);

    await LeaderboardModel.insertMany([
      { userId: users[0]._id, name: 'Ava Patel', points: 1350 },
      { userId: users[1]._id, name: 'Noah Brooks', points: 1180 },
      { userId: users[2]._id, name: 'Mina Chen', points: 1420 },
    ]);

    await WorkoutModel.insertMany([
      { title: 'HIIT Burn', difficulty: 'intermediate', durationMinutes: 25, description: 'A fast-paced cardio circuit for busy mornings.' },
      { title: 'Core Strength', difficulty: 'beginner', durationMinutes: 20, description: 'A steady core workout for building posture and stability.' },
      { title: 'Power Sprint', difficulty: 'advanced', durationMinutes: 30, description: 'Sprint intervals designed for serious athletes.' },
    ]);

    console.log('Database seeding complete');
    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workout plans.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
