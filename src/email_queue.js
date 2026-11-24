import express from 'express';
import redis from './connections/redis.js';

const queueRouter = express.Router();

const QUEUE_KEY = 'email_queue';

queueRouter.post('/emails', async (req, res) => {
   const job={
      to:req.query.to,
      subject:req.body.subject ||'No Subject',
      body:req.body.body,
      createdAt:new Date().toISOString()
   }
   await redis.lpush(QUEUE_KEY, JSON.stringify(job));
   res.json({queued:true, job});
});


queueRouter.get('/emails/process', async (req, res) => {
   const rowJob = await redis.rpop(QUEUE_KEY);
   if(!rowJob){
      return res.json({processed:false, message:'No jobs in the queue'});
   }
   const job = JSON.parse(rowJob);
   res.json({processed:true, job});

})

export default queueRouter;



