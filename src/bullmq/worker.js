import { Worker } from 'bullmq';
import queueValue from './queue.js';

const worker = new Worker(
  'emails',
  async (job) => {
    console.log('Processing job:', job.id, job.name, job.data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Finished processing email for:', job.data.to);
  },
  { connection: queueValue.connection }
);

worker.on('completed', (job) => {
  console.log('Job completed:', job.id, job.name);
});

worker.on('failed', (job, err) => {
  console.log('Job failed:', job?.id, job?.name, err.message);
});

export default worker;