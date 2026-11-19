import express from 'express';
import redis from './connections/redis.js';


const bannerRouter = express.Router();


const BANNER_KEY = 'app:banner';


bannerRouter.post('/banner', async (req, res) => {
  await redis.set(BANNER_KEY, req.body?.message || 'welcome to our bannerApp');
  
  res.json({"success": true});
});


bannerRouter.get('/banner', async (req, res) => {
  const bannerMessage = await redis.get(BANNER_KEY);
   res.json({"success": true, "message": bannerMessage || 'No banner message set' });
});


bannerRouter.delete('/banner', async (req, res) => {
  await redis.del(BANNER_KEY);
  res.json({"success": true, "message": 'Banner deleted successfully' });
});

bannerRouter.get("/banner/exists", async (req, res) => {
   const exists = await redis.exists(BANNER_KEY);
   //res.json({exits:Boolean(exists)});
   res.json({exits: exists}); // Redis returns 1 if the key exists, 0 if it does not});
});

export default bannerRouter;