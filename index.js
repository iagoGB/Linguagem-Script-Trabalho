const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');

server.engine('handlebars', handlebars({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

const porta = 3000;

server.get("/", (req,res) =>{
    res.render('input');
});

server.post('/processarCodigo', (req,res) => {
    //Pega a função digitada
    conteudo = req.body.conteudo;
    var regExp = /\(([^)]+)\)/;
    //Checa se a função tem parâmetros
    parametro = regExp.exec(req.body.conteudo);
    //console.log( array );
    if ( parametro == null ){
        
        fs.readFile("./views/result.handlebars",(erro, arquivo) =>{ 
            if (!erro){
                
                var regExp2 = /\${([^}]+)}/;
                result = regExp2.exec(arquivo);
                result.forEach(element => {
                   console.log("Elemento"+ element); 
                });
                res.send(result);
            } else {

                res.send("Erro ao executar o programa");
                res.sendStatus(400);
            }
        });
    } else {
        array = conteudo.split("{");
        //Pega o nome da função para executa-la
        chamarFuncao = array[0].replace('function','');
        console.log("funcao: " + chamarFuncao);
        result = eval(req.body.conteudo +" "+ chamarFuncao);
        res.send("A função possui parametros");
    }
    
   

    

});

server.listen(porta, () => {
    console.log(`Servidor rodando na porta http://localhost:${porta}`);
})

