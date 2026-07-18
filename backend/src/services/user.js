import pool from "../database/config.js";
import * as userQueries from '../database/queries/user.js';
import * as passwordUtils from '../utils/password.js';
import jwt from 'jsonwebtoken';

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
            const token = jwt.sign(
                {id: databaseData.id, email: databaseData.email},
                process.env.JWT_SECRET,
                {expiresIn: '7d'}
            );

            return {success: true, token};
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
export async function deleteUser(id) {
    let client;

    try {
        client = await pool.connect();

        await client.query('BEGIN');

        const deleted = await userQueries.delete_user(client, id);

        await client.query('COMMIT');

        return deleted;
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

// Função de atualizar usuário
export async function putUser(body) {
    const hashedPassword = await passwordUtils.hashPassword(body.password);
    
    let client;

    const userData = {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        steam_id: body.steam_id
    }

    try {
        if (body.old_email == undefined || body.old_email == null) {
            throw new Error("Missing old email");
        }

        client = await pool.connect();

        await client.query('BEGIN');

        const updated = await userQueries.update_user(client, userData);

        await client.query('COMMIT');

        return updated;
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