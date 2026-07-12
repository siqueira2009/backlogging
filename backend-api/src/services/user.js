import pool from "../database/config.js";
import * as userQueries from '../database/queries/user.js';


// Função de pegar usuário
export function getUser(id) {
    return `GET in /user with ID ${id}`;
}

// Função de postar usuário
export async function postUser(body) {
    let client;

    const userData = {
        name: body.name,
        email: body.email,
        password: body.password,
        steam_id: body.steam_id
    }

    try {
        client = await pool.connect();

        await client.query('BEGIN');

        const userId = await userQueries.create_user(client, userData);

        await client.query('COMMIT');

        return userId;
    } catch (error) {
        if (client) {
            await client.query('ROLLBACK');
        }

        throw error;
    } finally {
        if (client) {
            await client.release();
        }
    }
}

// Função de deletar usuário
export function deleteUser(id) {
    return `DELETE in /user with ID ${id}`;
}

// Função de atualizar usuário
export function putUser(id) {
    return `PUT in /user with ID ${id}`
}