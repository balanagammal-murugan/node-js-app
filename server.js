const express = require('express')
var bodyParser = require('body-parser')

const app = express();

const database = require('./src/db')
const routes = require('./src/routes/userRoute');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

const initDatabase = () => {
  const sqlQuery =  'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, name VARCHAR(50), email VARCHAR(50), role ENUM("Admin","User") NOT NULL, PRIMARY KEY(id))';

  database.query(sqlQuery, (err) => {
    if (err) throw err;
  });
};

initDatabase();

app.listen(5000, () => 
{
  console.log("Server running on port 5000");
});