import redis from '../connections/redis.js';

const subscriber = redis.duplicate();

subscriber.subscribe('notification', (err) => {
  if (err) {
    console.error('Failed to subscribe:', err.message);
    return;
  }
  console.log('Subscribed to notification channel successfully');
});

subscriber.on('message', (channel, message) => {
  console.log('Received on', channel, ':', JSON.parse(message));
});