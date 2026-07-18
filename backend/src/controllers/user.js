// Importação dos serviços e funções utilitárias
import * as services from '../services/user.js';
import * as errorUtils from '../utils/errors.js'; 

// Função de pegar usuário
export async function getUser(req, res) {
    try { // Primeiro tenta...
        const id = req.params.id; // Pegar o ID dos parâmetros
        const response = await services.getUser(id); // Esperar resposta dos serviços

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

        if (!response) {
            return res.status(401).json({error: "Invalid credentials."})
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
        const id = req.params.id;
        const response = await services.deleteUser(id);

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

        res.status(200).json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage)
    }
}