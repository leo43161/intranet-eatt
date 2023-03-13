import axios from "axios";
import Consultas from "./consultasHelpers";
const { verificarProv, verificarOrden, verificarDetalleOrden, cargarOrden, cargarProv, cargarDetallePago } = Consultas;
const codRetVerif = {
    101: "D.G.R. ING.BRUTOS P/PAG. ELECTR.",
    133: "TRIBUTO DE EMERGENCIA MUNICIPAL- TEM",
    402: "RET. IMP. GANANCIAS - PROVEEDORES Y CONTRATIS",
    409: "S.G.P. SIST. PENS. JUB. RETENC. PERSONAL"
}

const formatDeudas = {
    1: "nCuenta",
    2: "nombre",
    28: "retencion",
    32: "nOrden",
    34: "fecha",
    35: "nCompromiso",
    37: "codRet",
    38: "recursoEstado",
    39: "tipoRet",
    45: "importeRet",
}
const FORMAT_PAGOS = {
    0: "nCuenta",
    1: "nombre",
    11: "nOrden",
    14: "fechaP",
    28: "codExpEatt",
    32: "cuit",
    33: "razonSocial",
    36: "descGastos",
    39: "cbuProv",
    41: "fechafact",
    42: "tipoFact",
    43: "factura1",
    44: "factura2",
}
function formatearPagos(_pagos) {
    console.log(_pagos);
    let pagos = [];
    _pagos.forEach((pago) => {
        let _pago = {};
        for (const key in pago) {
            if (FORMAT_PAGOS[key]) {
                _pago[FORMAT_PAGOS[key]] = pago[key];
            }
        }
        _pago = formatearPago(_pago);
        pagos.push(_pago);
    });
    console.log(pagos);
    subirPagos(pagos);
}

const formatearTxt = (contenido, txt) => {
    const arrayData = contenido.split(/\r\n|\r|\n/, -1);
    const listaPagos = [];
    arrayData.forEach((element) => {
        const pago = element.split("	");
        listaPagos.push(pago);
    })
    listaPagos.pop();
    /* console.log(arrayData); */
    console.log(listaPagos);
    if (txt === 1) formatearPagos(listaPagos);
    /* if (txt === 2) writeTable(listaPagos, formatDeudas); */
}

export default function leerArchivo(file, txt) {
    var archivo = file;
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        const contenido = e.target.result;
        return formatearTxt(contenido, txt);
    };
    lector.readAsText(archivo);
}


const subirPagos = async (pagos = []) => {
    console.log(pagos);
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
    return;
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

const subirDedudas = () => {

}

const filterPagos = (pagos = []) => {
    /* Se aplica la filtracion a la cuenta de pagos del ente EATT - Pagos segun su nro de cuenta */
    let filterPagos = pagos.filter(({ ctaEmisora }) => ctaEmisora !== "71975050");
    filterPagos = filterPagos.filter(({ ctaEmisora }) => ctaEmisora !== "71975050");
    console.log(filterPagos);
    return filterPagos;
}
const formatearPago = (pago) => {
    let _pago = pago;
    _pago.codExpEatt = pago.codExpEatt.slice(2, -1).replace('460   ', '-');
    _pago.fechaP = pago.fechaP.slice(0, 4) + "-" + pago.fechaP.slice(4, 6) + "-" + pago.fechaP.slice(6, 8);
    _pago.nombre = pago.nombre.trim();
    _pago.fechafact = pago.fechafact.slice(0, 4) + "-" + pago.fechafact.slice(4, 6) + "-" + pago.fechafact.slice(6, 8);
    _pago.tipoFact = pago.tipoFact.replace('FACT ', '');
    _pago.nFactura = `${pago.factura1}-${pago.factura2}`;
    return _pago;
}