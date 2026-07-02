import express from 'express';

import user from './src/routers/user.js';

const server = express();

server.use('/user', user);

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.warn(`Server initialized successfully in port ${PORT}`);
});