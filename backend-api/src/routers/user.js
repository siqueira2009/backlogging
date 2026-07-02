import express from 'express';
import * as controllers from '../controllers/user.js'

const router = express.Router();

router.get('/', (req, res) => {
    controllers.getUser(req, res);
});

router.post('/', (req, res) => {
    controllers.postUser(req, res);
});

router.delete('/:id', (req, res) => {
    controllers.deleteUser(req, res);
});

router.put('/:id', (req, res) => {
    controllers.putUser(req, res);
});

export default router;