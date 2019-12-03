const express = require('express');
const server = express();

const porta = 3000;

server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})

