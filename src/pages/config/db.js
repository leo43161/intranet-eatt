import mysql from 'serverless-mysql';

const pool = mysql({
    config: {
        host: 'localhost',
        user: "root",
        password: "",
        database: "intraneteatt",
    },
});

export { pool };