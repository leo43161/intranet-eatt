import {poolLocal, poolRemote} from '../config/db'

export const exectQueryGlobal = async (query) => {
    try {
        const resultsRemote = await executeQuery(poolRemote, query);
        if (resultsRemote) {
            const results = await executeQuery(poolLocal, query);
            return results;
        }
    } catch (error) {
        return null;
    }
}

const executeQuery = async (pool, query) => {
    console.log('Executing query')
    console.log(query);
    try {
        const results = await pool.query(query);
        return results;
    } catch (error) {
        console.error("Error al ejecutar la consulta en la base de datos:", error);
        return null;
    }
};