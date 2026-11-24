import express from 'express';
import queueValue from './queue.js';

const bullmqRouter = express.Router();
const { emailQueue } = queueValue;

bullmqRouter.post('/welcome-bullmq', async (req, res) => {
  try {
    const { to, name } = req.body;

    if (!to) {
      return res.status(400).json({ message: "'to' email is required" });
    }

    const job = await emailQueue.add(
      'welcome-email',{
        to,
        name: name || 'Learner',
      },{
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      }
    );

    return res.status(201).json({
      message: 'Welcome email job added to the queue!',
      jobId: job.id,
      queueName: emailQueue.name,
    });
  } catch (error) {
    console.error('Error adding job to BullMQ:', error);
    return res.status(500).json({ message: 'Failed to queue email job' });
  }
});

export default bullmqRouter;