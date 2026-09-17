import mysql from 'mysql2/promise';

const cx = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'atividade',
    password: ""
});

export default cx;
