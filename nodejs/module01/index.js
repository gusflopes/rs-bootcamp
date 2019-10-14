const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Diego", "email": "gusflopes86@gmail.com" }

// CRUD - Create, Read, Update, Delete

// Data
const users = ['Gustavo', 'Diego', 'Francisco'];

//MIDDLEWARES CAN MODIFY **REQ** AND RES

//Middleware Global
server.use((req, res, next) => {
  console.time('Request');
  // Working as a console log middleware.
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  //return next(); // The return will halt this middleware
  next(); // In this case it'll resume after the next() is done.

  console.timeEnd('Request');
});

//Internal Middlewares
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required.'})
  }
  
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'User does not exists.'});
  }

  req.user = user;

  return next();
}

//Routes
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  /* Old without the Middleware that created req.user
  const { index } = req.params;
  return res.json(users[index]);
  */
 
  return res.json(req.user);
});

server.put('/users/:index', checkUserInArray, checkUserExists, (req,res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();

})

server.listen(3000);
