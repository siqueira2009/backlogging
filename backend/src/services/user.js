import pool from "../database/config.js";
import * as userQueries from '../database/queries/user.js';
import * as passwordUtils from '../utils/password.js';

// Função de pegar usuário
export async function getUser(id) {
    let client;

    try {
        client = await pool.connect();
        const user = await userQueries.get_user(client, id);

        return user;
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function getUsers() {
    let client;

    try {
        client = await pool.connect();
        const users = await userQueries.get_users(client);

        return users;
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

// Função de postar usuário
export async function registerUser(body) {
    const hashedPassword = await passwordUtils.hashPassword(body.password);
    
    let client;

    const userData = {
        name: body.name,
        email: body.email,
        password: hashedPassword,
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

export async function loginUser(body) {
    let client;

    const userData = {
        email: body.email,
        password: body.password
    }

    try {
        client = await pool.connect();

        const databaseData = await userQueries.get_user_password(client, userData.email);

        const isValid = await passwordUtils.comparePassword(userData.password, databaseData.password);

        if (isValid) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
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