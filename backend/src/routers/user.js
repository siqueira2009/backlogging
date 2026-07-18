// Importação de dependências
import express from 'express';

// Importação dos controllers
import * as controllers from '../controllers/user.js'

const router = express.Router(); // Cria um router

// =========== MÉTODO GET ===========
router.get('/:id', (req, res) => {
    controllers.getUser(req, res);
});

router.get('/', (req, res) => {
    controllers.getUsers(req, res);
})

// =========== MÉTODO POST ===========
// ============== LOGIN ============== 
router.post('/register', (req, res) => {
    controllers.registerUser(req, res);
});

router.post('/login', (req, res) => {
    controllers.loginUser(req, res);
})

// =========== MÉTODO DELETE ===========
router.delete('/:id', (req, res) => {
    controllers.deleteUser(req, res);
});

// =========== MÉTODO PUT ===========
router.put('/', (req, res) => {
    controllers.putUser(req, res);
});

export default router; // Exporta o Router