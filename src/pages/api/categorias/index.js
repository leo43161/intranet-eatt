import { poolEatt } from "../../../config/db";
const queryGetCategorias = `CALL ps_ListarCategorias();`;
const queryGetSubCategoriasEvent = (id) => `CALL ps_ListarSubCategorias(${id});`;


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { idCategEvento } = req.query
            if (idCategEvento) { return await getSubCategoriasEvent(req, res) } else { return await getCategoriasEvent(req, res) }
        /* case "POST":
            return await postCategoria(req, res); */
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getCategoriasEvent = async (req, res) => {
    try {
        const results = await poolEatt.query(queryGetCategorias);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getSubCategoriasEvent = async (req, res) => {
    try {
        const { idCategEvento } = req.query
        const results = await poolEatt.query(queryGetSubCategoriasEvent(idCategEvento));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

/* const postCategoria = async (req, res) => {

}; */