import express from 'express';
import redis from './connections/redis.js';
import { connectMongo } from './connections/mongo.js';
import bannerRouter from './bannerRedis.js';
import otpRouter from './otpRedis.js';
import profileRouter from './redis_json_vs_hash.js';
import queueRouter from './email_queue.js';
import bullmqRouter from './bullmq/api.js';


const app = express();
app.use(express.json());

app.get('/redis', async (req, res) => {
  const reply = await redis.ping();
  res.json({ redis: reply });
});

app.get('/mongo', async (req, res) => {
  const connection = await connectMongo();
  res.json({ mongo: 'connected', database: connection.db.databaseName });
});

app.use(bannerRouter);
app.use(otpRouter);
app.use(profileRouter);
app.use(queueRouter);
app.use(bullmqRouter);

export default app;
