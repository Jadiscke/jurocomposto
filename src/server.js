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

server.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
      res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
  else //Se a requisição já é HTTPS 
      next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});
server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.get('/', (req,res) => {
  res.render("index.njk");
});


server.listen(port, ()=> {
  console.log('Listening');
});