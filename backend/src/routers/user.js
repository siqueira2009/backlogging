// Importação de dependências
import express from 'express';

// Importação dos controllers
import * as controllers from '../controllers/user.js'

const router = express.Router(); // Cria um router

// Caso o método seja GET...
router.get('/:id', (req, res) => {
    controllers.getUser(req, res);
});

// Caso o método seja POST...
router.post('/register', (req, res) => {
    controllers.registerUser(req, res);
});

router.post('/login', (req, res) => {
    controllers.loginUser(req, res);
})

// Caso o método seja DELETE...
router.delete('/:id', (req, res) => {
    controllers.deleteUser(req, res);
});

// Caso o método seja PUT...
router.put('/:id', (req, res) => {
    controllers.putUser(req, res);
});

export default router; // Exporta o Router