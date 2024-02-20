import { poolEatt } from "../../../config/db";
const queryGetLocalidades = `CALL sp_ListarLocalidades();`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getLocalidades(req, res);
        /* case "POST":
            return await postOrdenDetalle(req, res); */
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getLocalidades = async (req, res) => {
    try {
        const results = await poolEatt.query(queryGetLocalidades);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

/* const postOrdenDetalle = async (req, res) => {

}; */