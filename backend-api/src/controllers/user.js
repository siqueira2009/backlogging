import * as services from '../services/user.js';
import * as errorUtils from '../utils/errors.js'; 

export async function getUser(req, res) {
    try {
        const response = await services.getUser();

        res.json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage);
    }
}

export async function postUser(req, res) {
    try {
        const body = req.body;
        const response = await services.postUser();

        res.json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage);
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const response = services.deleteUser(id);

        res.json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage)
    }
}

export async function putUser(req, res) {
    try {
        const id = req.params.id;
        const response = services.putUser(id);

        res.json({response: response});
    } catch (error) {
        const errorMessage = errorUtils.errorMessages(error, req);
        console.error(errorMessage);
        res.json(errorMessage)
    }
}