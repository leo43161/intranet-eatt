import { poolEatt } from "../../../config/db";
const queryGetEventos = ({
    nombre,
    fechaInicio,
    fechaFin,
    first,
    last
}) => {
    // Función para formatear los parámetros condicionalmente
    const formatParam = param => param != null ? `'${param}'` : null;
    // Construir y retornar la consulta con los parámetros formateados
    return `CALL sp_ListarEventos(${formatParam(nombre)}, ${formatParam(fechaInicio)}, ${formatParam(fechaFin)}, ${first}, ${last});`;
};
const queryGetAllEventos = ({
    nombre,
    fechaInicio,
    fechaFin,
}) => {
    // Función para formatear los parámetros condicionalmente
    const formatParam = param => param != null ? `'${param}'` : null;
    // Construir y retornar la consulta con los parámetros formateados
    return `CALL sp_All_Eventos(${formatParam(nombre)}, ${formatParam(fechaInicio)}, ${formatParam(fechaFin)});`;
};
const queryPostEvento = ({
    nombre,
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    descripcion,
    imagen,
    visible,
    destacado,
    idSubcat,
    idCategoria,
    direccion,
    idLocalidad,
    latitud,
    longitud
}) => `CALL sp_InsertarEvento("${nombre}","${fechaInicio}","${fechaFin}","${horaInicio}","${horaFin}","${descripcion}","${imagen}", 1,${visible},${destacado},${idSubcat},"${direccion}",${idLocalidad},${latitud},${longitud},"${idCategoria}");`;
const queryPutEvento = ({
    id,
    nombre,
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    descripcion,
    imagen,
    visible,
    destacado,
    idSubcat,
    idCategoria,
    direccion,
    idLocalidad,
    latitud,
    longitud
}) => `CALL sp_ModificarEvento(${id},"${nombre}","${fechaInicio}","${fechaFin}","${horaInicio}","${horaFin}","${descripcion}","${imagen}", 1,${visible},${destacado},${idSubcat},"${direccion}",${idLocalidad},${latitud},${longitud},${idCategoria});`;

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { consulta } = req.query
            if (consulta === "all") {
                return await getEventosAll(req, res);
            }
            return await getEventos(req, res);
        case "POST":
            return await postEventos(req, res);
        case "PUT":
            return await putEvento(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}
const getEventosAll = async (req, res) => {
    try {
        const { filters } = req.query
        const _filters = JSON.parse(filters);
        const results = await poolEatt.query(queryGetAllEventos(_filters));
        return res.status(200).json(results[0][0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const getEventos = async (req, res) => {
    try {
        const { filters } = req.query
        const _filters = JSON.parse(filters);
        console.log(_filters);
        const results = await poolEatt.query(queryGetEventos(_filters));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const putEvento = async (req, res) => {
    const { evento } = req.body.params;
    try {
        const results = await poolEatt.query(queryPutEvento(evento));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, queryString: queryPutEvento(evento) });
    }
};

const postEventos = async (req, res) => {
    const { evento } = req.body.params
    try {
        const results = await poolEatt.query(queryPostEvento(evento));
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error, query: queryPostEvento(evento) });
    }
};