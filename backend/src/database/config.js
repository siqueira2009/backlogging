import pg from 'pg';

const {Pool} = pg;

const pool = new Pool({
    host: '127.0.0.1', 
    port: 5432,
    database: 'bl-db',
    user: 'bl',
    password: 'password'
});

export default pool;