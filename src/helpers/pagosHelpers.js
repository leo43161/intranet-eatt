import axios from "axios";
import Consultas from "./consultasHelpers";
const { verificarProv, verificarOrden, verificarDetalleOrden, cargarOrden, cargarProv, cargarDetallePago } = Consultas;
const codRetVerif = {
    101: "D.G.R. ING.BRUTOS P/PAG. ELECTR.",
    133: "TRIBUTO DE EMERGENCIA MUNICIPAL- TEM",
    402: "RET. IMP. GANANCIAS - PROVEEDORES Y CONTRATIS",
    409: "S.G.P. SIST. PENS. JUB. RETENC. PERSONAL"
}
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
        pago.cuit = parseInt(element.substring(51, 62));
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
        pagosDetalleOmitidos: [],
        cantidad: 0
    }
    /* Se aplica la funcion para realizar la filtracion general */
    const _pagos = filterPagos(pagos);
    console.log(_pagos.length);
    const findPago = _pagos.filter(e => e.ordenPago === "114879");
    console.log(findPago);
    _pagos.forEach(async (pago, index) => {
        /* console.log(codRetVerif[pago.codRet]); */
        console.log(pago.ctaEmisora === "71975050" ? pago : false);
        if (pago.codRet === "000" && pago.cuit > 9999999999) {
            if (!await verificarOrden(pago.ordenPago, pago.cuit)) {
                console.log("PASA POR AQUI");
                const checkProv = await verificarProv(pago.cuit);
                if (!checkProv) {
                    if (!countPagos.proveedores.includes(pago.cuit)) {
                        countPagos.proveedores.push(pago.cuit)
                        const resProv = await cargarProv(pago);
                        console.log(resProv);
                    }
                } else {
                    countPagos.proveedoresRepetidos.push(pago.cuit)
                }
                console.log(index === 1 && pago);
                const resPago = await cargarOrden(pago);
                countPagos.ordenesDePago.push(pago.ordenPago);
            } else {
                countPagos.pagosRepetidos.push(pago.ordenPago);
            }
        }
    })

    _pagos.forEach(async (pago, index) => {
        /* console.log(codRetVerif[pago.codRet]); */
        if (codRetVerif[pago.codRet]) {
            if (pago.codRet !== "000" && pago.cuit < 9999999999) {
                /* console.log(pago.codRet); */
                if (!await verificarDetalleOrden(pago.ordenPago, pago.codRet)) {
                    const resProv = await cargarDetallePago(pago);
                    countPagos.detalleDePago.push(pago.ordenPago)
                } else if (await verificarDetalleOrden(pago.ordenPago, pago.codRet)) {
                    countPagos.pagosDetalleRepetidos.push(pago.ordenPago)
                } else {
                    countPagos.pagosDetalleRepetidos.push(pago.ordenPago)
                    /* countPagos.pagosRepetidos.push(pago.ordenPago) */
                }
            }
        } else {
            if (pago.codRet !== "000") {
                countPagos.pagosDetalleOmitidos.push(pago)
            }
        }
    });
    console.log(countPagos);
}

const filterPagos = (pagos = []) => {
    /* Se aplica la filtracion a la cuenta de pagos del ente EATT - Pagos segun su nro de cuenta */
    let filterPagos = pagos.filter(({ ctaEmisora }) => ctaEmisora !== "71975050");
    filterPagos = filterPagos.filter(({ ctaEmisora }) => ctaEmisora !== "71975050");
    console.log(filterPagos);
    return filterPagos;
}