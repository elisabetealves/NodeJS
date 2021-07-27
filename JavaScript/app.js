// Incluindo as bibliotecas
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

// Definição de endereço / URL
const hostname = '127.0.0.1';
const port = 3000;

//Implementação da regra de negócio
const server = http.createServer((req, res) => {

    var resposta;
    const urlparse = url.parse(req.url, true)
    //rececer infoemações do usuário
    const params = queryString.parse(urlparse.search)
  
  // Criar usuário - Atualizar um usuário
  if(urlparse.pathname == '/criar-atualizar-usuario'){
    //salvar e arualizar as informações
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
        if (err) throw err;
        console.log('Saved!');

        resposta = 'Usuario criado/atualizado com sucesso';

        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
    }); 
  }
  // Selecionar um usuário 
  else if (urlparse.pathname == '/selecionar-usuario'){
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
        resposta = data;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);
    });
  }
  // Remover um usuário 
  else if (urlparse.pathname == '/remover-usuario'){
    fs.unlink('users/' + params.id + '.txt', function (err) {
        console.log('File deleted!');

        resposta = err ? 'Usuario nao enconrado':'Usuario removido';

        res.statusCode = 204;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// http://localhost:3000//criar-atualizar-usuario?nome=elisabete&idade=31&id=1
// http://localhost:3000//criar-atualizar-usuario?nome=elisabete-alves&idade=31&id=1
// http://localhost:3000/selecionar-usuario?id=1
// http://localhost:3000/remover-usuario?id=1