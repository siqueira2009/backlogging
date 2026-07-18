// Importação dos serviços e funções utilitárias
import * as services from '../services/user.js';
import * as errorUtils from '../utils/errors.js'; 

// Função de pegar usuário
export async function getUser(req, res) {
    try { // Primeiro tenta...
        const id = req.params.id; // Pegar o ID dos parâmetros
        const response = await services.getUser(id); // Esperar resposta dos serviços

        if (!response || response.length == 0) {
            return res.status(404).json({error: "No users found."});
        }

        res.status(200).json({response: response}); // Devolver essa resposta
    } catch (error) { // Em caso de erro...
        const errorMessage = errorUtils.errorMessages(error, req); // Gera mensagem de erro usando a função utilitária

        // Printa e devolve esse erro
        console.error(errorMessage);
        res.json(errorMessage);
    }
}

export async function getUsers(req, res) {
    try {
        const response = await services.getUsers();

        if (!response || response.length == 0) {
            return res.status(404).json({error: "User not found."});
        }

        res.status(200).json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);

        console.error(errorMessage);
        res.json(errorMessage);
    }
}

// Função de postar usuário
export async function registerUser(req, res) {
    try {
        const body = req.body;

        const response = await services.registerUser(body);

        if (!response.success) {
            return res.status(400).json({error: "Impossible to register user."});
        }

        res.status(200).json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage);
    }
}

export async function loginUser(req, res) {
    try {
        const body = req.body;

        const response = await services.loginUser(body);

        if (!response.success) {
            return res.status(401).json({error: "Impossible to login user."});
        }

        res.status(200).json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage);
    }
}

// Função de deletar usuário
export async function deleteUser(req, res) {
    try {
        const id = req.user.id;
        const body = req.body;
        const response = await services.deleteUser(body, id);

        if (!response) {
            return res.status(400).json({error: "Impossible to delete user."});
        }

        res.status(200).json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage)
    }
}

// Função de atualizar usuário
export async function putUser(req, res) {
    try {
        const id = req.user.id;
        const body = req.body;
        const response = await services.putUser(body, id);

        if (!response) {
            return res.status(400).json({error: "Impossible to delete user."});
        }

        res.status(200).json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage)
    }
}