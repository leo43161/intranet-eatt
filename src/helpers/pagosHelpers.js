import axios from "axios";
import Consultas from "./consultasHelpers";
const { verificarProv, verificarOrden, verificarDetalleOrden, cargarOrden, cargarProv, cargarDetallePago } = Consultas;
const codRetVerif = {
    101: "D.G.R. ING.BRUTOS P/PAG. ELECTR.",
    133: "TRIBUTO DE EMERGENCIA MUNICIPAL- TEM",
    402: "RET. IMP. GANANCIAS - PROVEEDORES Y CONTRATIS",
    409: "S.G.P. SIST. PENS. JUB. RETENC. PERSONAL"
}

const FORMAT_DEUDAS = {
    1: "nCuenta",
    2: "nombre",
    28: "retencion",
    32: "nOrden",
    34: "fecha",
    35: "nCompromiso",
    37: "codRet",
    38: "recursoEstado",
    39: "tipoRet",
    40: "cuit",
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
    40: "netoProv",
    41: "fechafact",
    42: "tipoFact",
    43: "factura1",
    44: "factura2",
    47: "ctaEmisora1",
    48: "ctaEmisora2",
    49: "ctaEmisora3",
}

export const formatearTxt = (contenido, txt) => {
    const arrayData = contenido.split(/\r\n|\r|\n/, -1);
    let listaPagos = [];
    arrayData.forEach((element) => {
        const pago = element.split("	");
        listaPagos.push(pago);
    })
    listaPagos.pop();
    /* console.log(arrayData); */
    console.log(listaPagos);
    listaPagos = formatearOrdenes(listaPagos, txt);
    return listaPagos;
}

function formatearOrdenes(_ordenes, txt) {
    let ordenes = [];
    const FORMAT = txt === 1 ? FORMAT_PAGOS : FORMAT_DEUDAS;
    console.log(_ordenes)
    _ordenes.forEach((orden) => {
        let _orden = {};
        for (const key in orden) {
            if (FORMAT[key]) {
                _orden[FORMAT[key]] = orden[key];
            }
        }
        if (txt === 1) _orden = formatearPago(_orden);
        if (txt === 2) _orden = formatearDeudas(_orden);
        ordenes.push(_orden);
    });
    ordenes = filterPagos(ordenes);
    return (ordenes);
}

console.log(parseFloat(" 10,785.95".replace(",", "")));

const formatearPago = (pago) => {
    let _pago = pago;
    _pago.libramiento = pago.codExpEatt.slice(2, -1).replace('460   ', '');
    _pago.fechaP = pago.fechaP.slice(0, 4) + "-" + pago.fechaP.slice(4, 6) + "-" + pago.fechaP.slice(6, 8);
    _pago.nombre = pago.nombre.trim();
    _pago.fechafact = pago.fechafact.slice(0, 4) + "-" + pago.fechafact.slice(4, 6) + "-" + pago.fechafact.slice(6, 8);
    _pago.tipoFact = pago.tipoFact.replace('FACT ', '');
    _pago.nFactura = `${pago.factura1}-${pago.factura2}`;
    _pago.netoProv = `${_pago.netoProv.trim().slice(0, _pago.netoProv.trim().length - 2)}.${_pago.netoProv.trim().slice(-2)}`;
    _pago.ctaEmisora = `${pago.ctaEmisora1}${pago.ctaEmisora2}${pago.ctaEmisora3}`;
    return _pago;
}
const formatearDeudas = (pago) => {
    let _pago = pago;
    _pago.importeRet = parseFloat(pago.importeRet.replace(",", ""));
    _pago.nCuenta = pago.nCuenta.replaceAll("-", "");
    return _pago;
}

const filterPagos = (deudas = []) => {
    /* Se aplica la filtracion a la cuenta de deudas del ente EATT - deudas segun su nro de cuenta */
    let filterPagos = deudas.filter(({ cuit }) => cuit !== "30709204617");
    /* filterPagos = deudas.filter(({ cuit }) => cuit.length < 10); */
    /* filterPagos = deudas; */
    console.log(filterPagos);
    return filterPagos;
}

export const subirPagos = async (pagos) => {
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
    pagos.forEach(async (pago) => {
        const checkProv = await verificarProv(pago.cuit);
        const checkOrden = await verificarOrden(pago.nOrden, pago.cuit);
        if (!countPagos.ordenesDePago.includes(pago.nOrden)) {
            if (!checkOrden) {
                if (!checkProv) {
                    if (!countPagos.proveedores.includes(pago.cuit)) {
                        console.log(pago);
                        countPagos.proveedores.push(pago.cuit);
                        const resProv = await cargarProv(pago);
                        console.log(resProv);
                    }
                } else {
                    countPagos.proveedoresRepetidos.push(pago.cuit);
                }
                const resPago = await cargarOrden(pago);
                countPagos.ordenesDePago.push(pago.nOrden);
                console.log(resPago);
            } else {
                countPagos.pagosRepetidos.push(pago.nOrden);
            }
        }
    });
    return countPagos;

    pagos.forEach(async (pago, index) => {
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

export const subirDeudas = (deudas) => {
    const countDeudas = {
        proveedores: [],
        ordenesDePago: [],
        detalleDePago: [],
        proveedoresRepetidos: [],
        pagosDetalleRepetidos: [],
        pagosRepetidos: [],
        pagosDetalleOmitidos: [],
        cantidad: 0
    }

    deudas.forEach((deuda) => {

    })
}

export const checkPagos = (pagos) => {
    console.log(pagos);
    let _pagos = pagos;
    let _checkPagos = [];
    const busqueda = _pagos.reduce((acc, _pagos) => {
        acc[_pagos.nOrden] = ++acc[_pagos.nOrden] || 0;
        return acc;
    }, {});

    for (const key in busqueda) {
        const element = busqueda[key];
        if (element) {
            const filterExist = _pagos.map((_pago, idx) => _pago.nOrden === key && { _pago, index: idx }).filter(Boolean);
            _checkPagos.push(filterExist);
        }
    }
    console.log(_checkPagos);
    return _checkPagos;
};