const express = require('express');
//console.log(express);

const server = express();

server.get('/users/:id', (req, res) => {
  const { id } = req.params.id;

  return res.json({message: `Searching the user ${id}`});
});

/* #### FIRST THINGS
// Query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "Gustavo", "email": "gusflopes86@gmail.com"}
// Request headers = payload, etc

server.get('/teste', (req, res) => {
  console.log('Mensagem no Console do Servidor');

  const name = req.query.name;

  //return res.send('Hello World');
  //return res.json({ message: 'Hello World' });

  //Request for this: http://localhost:3000/teste?name=Gustavo
  return res.json({ message: `Hello ${name}!` });
});

*/


server.listen(3000);
