import Consultas from "./consultasHelpers";
const { listarPagos } = Consultas;

export const listPagos = async () => {
    const pagos = await listarPagos();
    console.log(pagos);
}