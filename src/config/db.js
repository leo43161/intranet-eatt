import mysql from 'serverless-mysql';

const poolLocal = mysql({
    config: {
        host: 'localhost',
        user: "root",
        password: "",
        database: "intraneteatt",
    },
});
const poolRemote = mysql({
    config: {
        host: 'tucumanturismo.gob.ar',
        port: 3306,
        database: "intraneteatt",
        user: "adminintranet",
        password: "admin159753+",
    },
});
export { poolLocal, poolRemote };