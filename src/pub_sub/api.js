import express from 'express';
import redis from '../connections/redis.js';

const pubSubRouter = express.Router();

pubSubRouter.post('/notification', async (req, res) => {
  try {
    const payload = {
      title: req.body.title || 'Default title',
      createdAt: new Date().toISOString(),
    };

    const receivers = await redis.publish(
      'notification',
      JSON.stringify(payload)
    );

    return res.json({
      message: `Notification sent to ${receivers} subscribers`,
      payload,
    });
  } catch (error) {
    console.error('Publish error:', error);
    return res.status(500).json({ message: 'Failed to publish notification' });
  }
});

export default pubSubRouter;