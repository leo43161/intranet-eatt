import axios from "axios";
import Consultas from "./consultasHelpers";
const { verificarProv, verificarOrden, verificarDetalleOrden, cargarOrden, cargarProv, cargarDetallePago } = Consultas;
function formatearTxt(txt) {
    const contenido = txt;
    const arrayData = contenido.split(/\r\n|\r|\n/, -1);
    const listaPagos = [];
    arrayData.forEach((element) => {
        let pago = {};
        pago.ctaEmisora = element.substring(2, 10);
        pago.fechaEmision = `${element.substring(10, 14)}-${element.substring(14, 16)}-${element.substring(16, 18)}`;
        pago.ejercicio = element.substring(10, 14);
        pago.cheque = element.substring(18, 26);
        pago.cuit = element.substring(51, 62);
        pago.beneficiarios = element.substring(62, 122);
        pago.tipoComp = element.substring(144, 146);
        pago.ordenPago = element.substring(146, 152);
        pago.compPago = element.substring(152, 158);
        pago.monto = parseInt(element.substring(158, 171));
        pago.monto = pago.monto / 100;
        pago.entidad = element.substring(171, 173);
        pago.codRet = element.substring(183, 186);
        pago.tipoGasto = element.substring(271, 274);
        pago.fechaAcred = `${element.substring(246, 250)}-${element.substring(250, 252)}-${element.substring(252, 254)}`;

        listaPagos.push(pago);
    })
    /* console.log(arrayData); */
    subirPagos(listaPagos);
}

export default function leerArchivo(file) {
    var archivo = file;
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        const contenido = e.target.result;
        return formatearTxt(contenido);
    };
    lector.readAsText(archivo);
}

const subirPagos = async (pagos = []) => {
    const countPagos = {
        proveedores: [],
        ordenesDePago: [],
        detalleDePago: [],
        proveedoresRepetidos: [],
        pagosDetalleRepetidos: [],
        pagosRepetidos: [],
        cantidad: 0
    }
    /* Se aplica la funcion para realizar la filtracion general */
    const _pagos = filterPagos(pagos);

    console.log(pagos);
    _pagos.forEach(async (pago, index) => {
        console.log(pago.ctaEmisora === "71975050" ? pago : false);
        if (pago.codRet === "000" && !await verificarOrden(pago.ordenPago, pago.cuit)) {
            console.log("PASA POR AQUI");
            console.log(await verificarProv(pago.cuit));
            const checkProv = await verificarProv(pago.cuit);
            if (!checkProv) {
                if (!countPagos.proveedores.includes(pago.cuit)) {
                    countPagos.proveedores.push(pago.cuit)
                    console.log(pago);
                    const resProv = await cargarProv(pago);
                    console.log(resProv);
                }
            } else {
                countPagos.proveedoresRepetidos.push(pago.cuit)
            }
            const resPago = await cargarOrden(pago);
            console.log(pago);
            countPagos.ordenesDePago.push(pago.ordenPago);
        } else {
            countPagos.pagosRepetidos.push(pago.ordenPago)
        }
    })
    /* pagos.forEach(async (pago, index) => {
        if (index < 10) {
            if (!await verificarDetalleOrden(pago.ordenPago, pago.codRet)) {
                console.log(pago);
                countPagos.detalleDePago.push(pago.ordenPago)

            } else if (await verificarDetalleOrden(pago.ordenPago, pago.codRet)) {
                countPagos.pagosDetalleRepetidos.push(pago.ordenPago)
            } else {
                countPagos.pagosRepetidos.push(pago.ordenPago)
            }
        }
    }); */
    console.log(countPagos);
}

const filterPagos = (pagos = []) => {
    /* Se aplica la filtracion a la cuenta de pagos del ente EATT - Pagos segun su nro de cuenta */
    let filterPagos = pagos.filter(({ ctaEmisora }) => ctaEmisora !== "71975050");

    return filterPagos;
}