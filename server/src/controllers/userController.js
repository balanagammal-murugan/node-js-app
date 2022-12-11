const { validationResult } = require('express-validator');
const database = require('../db');

const getUsers = (req, res) => {
  const sqlQuery = 'SELECT * FROM users';
  
  database.query(sqlQuery, (err, result) => {
      if (err) throw err;
      res.json({ 'users': result });
  });
};

const addUser = (req, res) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
      res.statusCode = 400;
      res.send(errors.array());
  } else {
      const user = {
          email: req.body.email,
          name: req.body.name,
          role: req.body.role
      };
      const sqlQuery = 'INSERT INTO users SET ?';

      database.query(sqlQuery, user, (err, row) => {
          if (err) throw err;
          res.send('User created successfully!');
      });
  }
};

const deleteUser = (req,res) => {
  const sqlQuery = "DELETE FROM users WHERE id = ?";
  
  database.query(sqlQuery, parseInt(req.params.id, 10), (err, row) => {
      if (err) throw err;
      res.send('User deleted successfully!');
  });
};

const updateUser = (req,res) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
      res.statusCode = 400;
      res.send(errors.array());
  } else {
      const user = {
          email: req.body.email,
          name: req.body.name,
          role: req.body.role
      };
      const sqlQuery = "UPDATE users SET ? WHERE id = ?"

      database.query(sqlQuery, [user, parseInt(req.params.id, 10)], (err, row) => {
          if (err) throw err;
          res.send('User updated successfully!');
      });
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser
}