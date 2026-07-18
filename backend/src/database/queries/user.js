export async function get_user(client, id) {
    const query = `
        SELECT id, name, email, gametype, steam_id FROM users WHERE id = $1
    `

    const res = await client.query(query, [id]);

    return res.rows[0];
}

export async function get_users(client) {
    const query = `
        SELECT id, name, email, gametype, steam_id FROM users;
    `

    const res = await client.query(query);

    return res.rows;
}

export async function get_user_password_by_id(client, id) {
    const query = `SELECT password FROM users WHERE id = $1`;

    const res = await client.query(query, [id]);

    return res.rows[0];
}


export async function get_user_password_by_email(client, email) {
    const query = `SELECT id, email, password FROM users WHERE email = $1`;
    const res = await client.query(query, [email]);
    return res.rows[0];
}

export async function create_user(client, userData) {
    const query = `
        INSERT INTO users (name, email, password, steam_id) VALUES ($1, $2, $3, $4)
        RETURNING id
    `

    const res = await client.query(query, [userData.name, userData.email, userData.password, userData.steam_id]);

    return res.rows[0].id;
}

export async function delete_user(client, id) {
    const query = `
        DELETE FROM users WHERE id = $1
        RETURNING id
    `

    const res = await client.query(query, [id]);

    return res.rowCount > 0;
}

export async function update_user(client, userData) {
    const query = `
        UPDATE users
        SET name = $1, email = $2, password = $3
        WHERE id = $4
        RETURNING id
    `

    const res = await client.query(query, [userData.name, userData.email, userData.password, userData.id]);

    return res.rowCount > 0;
}