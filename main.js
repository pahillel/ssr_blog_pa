require('dotenv').config();
const config = require('config');
const app = require('./src/server');

const PORT = config.get('port');

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
