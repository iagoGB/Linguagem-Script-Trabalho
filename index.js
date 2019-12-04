const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');

server.engine('handlebars', handlebars({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const porta = 3000;

server.get("/", (req, res) => {
    res.render('input');
});

server.post('/processarCodigo', (req, res) => {


    fs.readFile("./views/result.handlebars", (erro, arquivo) => {

        if (!erro) {

            // /g para multiplos  matches 
            var regExp = /\${([^}]+)}/g; // ${ QualquerCoisa }
            var match;
            var matchArray = [];

            while ((match = regExp.exec(arquivo)) !== null) {

                matchArray.push(match[1]);

            }


            var regExp2 = /\(([^)]+)\)/; // ( QualquerCoisa ) 
            var funcao = req.body.conteudo;
            nomeParametro = regExp2.exec(req.body.conteudo);

            var resultadoArquivo = arquivo.toString();

            matchArray.forEach(valorVariavel => {

                array = funcao.split("{");
                resultadoFuncao = eval(funcao + " " + array[0].replace(nomeParametro[1], valorVariavel).replace('function', ''));
                resultadoArquivo = resultadoArquivo.replace("${" + valorVariavel + "}", resultadoFuncao);

            });

            res.write(resultadoArquivo);

        } else {

            res.send("Erro ao executar o programa. Tente novamente");
        }
    });

});

server.listen(porta, () => {
    console.log(`Servidor rodando na porta http://localhost:${porta}`);
})

