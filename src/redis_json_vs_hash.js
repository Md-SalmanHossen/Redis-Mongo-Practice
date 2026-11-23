import express from 'express';
import redis from './connections/redis.js';

const profileRouter = express.Router();

// 1. JSON Format-e User Data Save (POST)
profileRouter.post('/user/:id/json', async (req, res) => {
  // URL param-er `id` ebong body-r sob field merge kore ekta object banano hoyeche
  const data = { id: req.params.id, ...req.body };

  // Redis-e string hisebe rakhar jonno JSON.stringify() dorkar
  await redis.set(`user:${req.params.id}:json`, JSON.stringify(data));

  res.json({ savedAs: "json" });
});

// 2. JSON Format-e User Data Read (GET)
profileRouter.get("/user/:id/json", async (req, res) => {
  const raw = await redis.get(`user:${req.params.id}:json`);

  // Data thakle JSON.parse() kore object banano hocche, na thakle null
  res.json({ user: raw ? JSON.parse(raw) : null });
});

// 3. Redis Hash Format-e User Data Save (POST)
profileRouter.post("/user/:id/hash", async (req, res) => {
  // HSET direct object-er field-value gulo ke hash hisebe store kore
  await redis.hset(`user:${req.params.id}:hash`, req.body);

  res.json({ savedAs: "hash" });
});

// 4. Redis Hash Format-e User Data Read (GET)
profileRouter.get("/user/:id/hash", async (req, res) => {
  // HGETALL hash-er sob field ebong value ekta object hisebe ferot dey
  const user = await redis.hgetall(`user:${req.params.id}:hash`);

  res.json({ user: user });
});

export default profileRouter;