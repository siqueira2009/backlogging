export async function get_user(client, id) {
    const query = `
        SELECT id, name, email, gametype, steam_id FROM users WHERE id = $1
    `

    const res = await client.query(query, [id]);

    return res.rows[0];
}

export async function get_user_password(client, email) {
    const query = `
        SELECT id, password FROM users WHERE email = $1
    `

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