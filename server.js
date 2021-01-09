const app = require('./app');
const { Sequelize } = require('sequelize');
const { PORT } = require('./config');

const db = new Sequelize('postgresql://expressblog@localhost:5432/expressblog');

db.authenticate()
  .then(() => console.log('Connected to database successfully.'))
  .catch((err) =>
    console.error('An error occured while trying to connect to database:', err)
  );

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Serverlistening at http://localhost:${PORT}`);
});

module.exports = db;
