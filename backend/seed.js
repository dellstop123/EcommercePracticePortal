import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Notification from './models/Notification.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany({});
  await Notification.deleteMany({});

  const hashedPassword = await bcrypt.hash('test123', 10);
  const user = await User.create({
    username: 'testuser',
    password: hashedPassword,
    name: 'Test User',
    email: 'testuser@example.com',
    avatar: 'https://i.pravatar.cc/150?u=testuser',
  });

  await Notification.create([
    { user: user._id, message: 'Welcome to the portal!' },
    { user: user._id, message: 'Your profile is 80% complete.' },
    { user: user._id, message: 'Try out the new features in the sidebar.' },
  ]);

  console.log('Seed complete!');
  process.exit();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
}); 