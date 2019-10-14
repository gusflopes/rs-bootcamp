const express = require('express');

const server = express();

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Diego", "email": "gusflopes86@gmail.com" }

const users = ['Gustavo', 'Diego', 'Francisco'];

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.listen(3000);
