const express = require('express');
const server = express();
const nunjucks = require('nunjucks');


const port = process.env.PORT || 3000;


server.set('view engine', 'njk');
nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});


server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.get('/', (req,res) => {
  res.render("index.njk");
});


server.listen(port, ()=> {
  console.log('Listening');
});