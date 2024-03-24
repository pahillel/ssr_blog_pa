require('dotenv').config();
const config = require('config');
const app = require('./src/server');
const { openConnection } = require('./src/connection');

const PORT = config.get('port');

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);

  await openConnection();
});
