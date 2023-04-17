import Consultas from "./consultasHelpers";
const { listarPagos } = Consultas;

export const listPagos = async () => {
    const pagos = await listarPagos();
    console.log(pagos);
    pagos.map(pago => {
        pago.FechaPago = convertirFecha(pago.FechaPago);
        pago.fechaFactura = convertirFecha(pago.fechaFactura);
    })
    console.log(pagos);
    return pagos;
}

function convertirFecha(fechaISO) {
    // Crear objeto Date
    const dateObject = new Date(Date.parse(fechaISO));

    // Crear cadena formateada
    const formattedString = dateObject.toLocaleDateString();

    // Extraer día, mes y año
    const [day, month, year] = formattedString.split("/");

    // Crear cadena final
    const finalString = `${day}/${month}/${year}`;
    console.log(finalString);
    return fechaISO !== "0000-00-00" ? finalString : "00/00/0000";
}