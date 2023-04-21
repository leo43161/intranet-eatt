import Consultas from "./consultasHelpers";
const { listarPagos, editarDetallePago, editarOrdenPago } = Consultas;

export const listPagos = async () => {
    const pagos = await listarPagos();
    pagos.map(pago => {
        pago.FechaPago = convertirFecha(pago.FechaPago);
        pago.fechaFactura = convertirFecha(pago.fechaFactura);
    })
    return pagos;
}

export const editarPago = async (pago) => {
    const { codop, saretId, saretP, ganId, ssId, temId, temP } = pago;
    console.log(pago);
    const codRetVerif = {
        "SARET": { cod: 101, porcent: saretP, id: saretId },
        "TEM": { cod: 133, porcent: temP, id: temId },
        "Gan": { cod: 402, porcent: 0, id: ganId },
        "SS": { cod: 409, porcent: 0, id: ssId }
    }
    for (const key in codRetVerif) {
        if (pago[key]) {
            const { cod, porcent, id } = codRetVerif[key];
            const detallePago = {
                idDOP: id,
                porcentaje: porcent,
                montoR: pago[key],
                cod: cod,
                idControl: codop
            }
            editarDetallePago(detallePago);
        };
    }
    await editarOrdenPago(pago);
}

export const convertirFechaInput = (fecha) => {
    const [dia, mes, anio] = fecha.split('/');
    const fechaISO = new Date(anio, mes - 1, dia).toISOString().split('T')[0];
    return fechaISO;
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
    return fechaISO !== "0000-00-00" ? finalString : "00/00/0000";
}