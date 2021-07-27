//Importação de bibliotecas
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse }from 'query-string';
import * as url from 'url';
import { writeFile} from 'fs';

// Definição da porta
const port = 5000;

const server = createServer((request:IncomingMessage, response: ServerResponse) => {

    const urlparse = url.parse(request.url ? request.url : '', true);
    var resposta;

    // Receber informações do usuários
    const params = parse(urlparse.search ? urlparse.search : '' );

    // Criar usuário - Atualizar um usuário
    if(urlparse.pathname == '/criar-atualizar-usuario'){
        //salvar e arualizar as informações
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if (err) throw err;
            console.log('Saved!');

            resposta = 'Usuario criado/atualizado com sucesso';

            response.statusCode = 201;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
        }); 
    }
});

//Exercução
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

// http://localhost:5000/criar-atualizar-usuario?nome=elisabete&idade=31&id=1