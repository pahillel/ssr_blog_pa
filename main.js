require('dotenv').config();
const config = require('config');
const app = require('./src/server');
const { openConnection } = require('./src/connection');
const { createAdmin } = require('./src/utils/create-admin');

const PORT = config.get('port');

app.listen(PORT, async () => {
  await openConnection();
  await createAdmin();
  console.log(`Server is running on port ${PORT}`);
});
