import app from './app.js';

const port = Number(process.env.PORT || 3000);

export function startServer() {
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
