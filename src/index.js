import 'dotenv/config';

import app from './app.js';

const port = Number(process.env.PORT || 3000);

function startServer() {
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


startServer();
