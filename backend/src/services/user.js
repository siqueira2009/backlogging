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
            return {success: false, };
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
export async function putUser(body, id) {
    let client;

    try {
        client = await pool.connect();

        const current = await userQueries.get_user_password_by_id(client, id);

        if (!current) {
            throw new Error("User not found.");
        }

        let newPassword = null;

        if (body.password) { // Se tiver o campo de senha, quer dizer que o usuário quer trocar de senha
            if (!body.current_password) { // Se não tiver campo de senha atual, ele não muda
                throw new Error("Current password is required to change password.");
            }

            // Vê se a senha atual é a mesma do banco
            const isValid = await passwordUtils.comparePassword(body.current_password, current.password);

            if (!isValid) { // Se não for, fala que a senha está incorreta
                throw new Error("Current password is incorrect.");
            } 

            // Se for... hasheia a nova senha
            newPassword = await passwordUtils.hashPassword(body.password);
        }

        // Monta os dados
        const userData = {
            id,
            name: body.name,
            email: body.email,
            password: body.password ?? current.password
        }

        // Muda no banco de dados
        await client.query('BEGIN');
        const updated = await userQueries.update_user(client, userData);
        await client.query('COMMIT');

        // Retorna o resultado da query
        return updated;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) await client.release();
    }
}