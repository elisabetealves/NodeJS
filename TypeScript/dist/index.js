"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importação de bibliotecas
var http_1 = require("http");
var query_string_1 = require("query-string");
var url = __importStar(require("url"));
var fs_1 = require("fs");
// Definição da porta
var port = 5000;
var server = http_1.createServer(function (request, response) {
    var urlparse = url.parse(request.url ? request.url : '', true);
    var resposta;
    // Receber informações do usuários
    var params = query_string_1.parse(urlparse.search ? urlparse.search : '');
    // Criar usuário - Atualizar um usuário
    if (urlparse.pathname == '/criar-atualizar-usuario') {
        //salvar e arualizar as informações
        fs_1.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err)
                throw err;
            console.log('Saved!');
            resposta = 'Usuario criado/atualizado com sucesso';
            response.statusCode = 201;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
        });
    }
});
//Exercução
server.listen(port, function () {
    console.log("Server running on port " + port);
});
// http://localhost:5000/criar-atualizar-usuario?nome=elisabete&idade=31&id=1
