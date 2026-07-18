// Importação de dependências
import express from 'express';
import * as dotenv from 'dotenv';

// Importação de Routers
import user from './src/routers/user.js'; 
dotenv.config();

const server = express(); // Cria o servidor Express

server.use(express.json());

server.use('/user', user); // Coloca tudo da rota /user para o Router de usuário

// Coloca o servidor para ouvir
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.warn(`Server initialized successfully in port ${PORT}`);
});