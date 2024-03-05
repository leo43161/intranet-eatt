import Consultas from "./consultasHelpers";
const { verificarProv, verificarOrden, verificarDetalleOrden, verificarOrdenFantasma, cargarOrden, cargarProv, cargarDetallePago, cargarOrdenFantasma, actualizarPagosFantasmas, cargarUserProv, verificarUserProv, actualizarOrdenPago, actualizarDetallePago } = Consultas;
const codRetVerif = {
    101: "D.G.R. ING.BRUTOS P/PAG. ELECTR.",
    133: "TRIBUTO DE EMERGENCIA MUNICIPAL- TEM",
    402: "RET. IMP. GANANCIAS - PROVEEDORES Y CONTRATIS",
    409: "S.G.P. SIST. PENS. JUB. RETENC. PERSONAL"
}
const FORMAT_DEUDAS = {
    2: "nCuenta",
    3: "nombre",
    4: "retencion",
    6: "importeRet",
    14: "nOrden",
    16: "fecha",
    18: "nCompromiso",
    19: "codRet",
    22: "recursoEstado",
    24: "tipoRet",
    23: "cuit",
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
    listaPagos = formatearOrdenes(listaPagos, txt);
    return listaPagos;
}
function formatearOrdenes(_ordenes, txt) {
    let ordenes = [];
    const FORMAT = txt === 1 ? FORMAT_PAGOS : FORMAT_DEUDAS;
    console.log(_ordenes);
    _ordenes.forEach((orden) => {
        let _orden = {};
        for (const key in orden) {
            if (FORMAT[key]) {
                _orden[FORMAT[key]] = orden[key];
            }
        }
        /* Verificar las facturas */
        /* console.log(_orden); */
        if (txt === 1) _orden = formatearPago(_orden);
        if (txt === 2) _orden = formatearDeudas(_orden);
        ordenes.push(_orden);
    });
    ordenes = txt === 1 ? filterPagos(ordenes) : filterDeudas(ordenes);
    return (ordenes);
}
const formatearPago = (pago) => {
    let _pago = pago;
    _pago.libramiento = pago.codExpEatt.slice(2, -1).replace('460   ', '');
    _pago.fechaP = pago.fechaP.slice(0, 4) + "-" + pago.fechaP.slice(4, 6) + "-" + pago.fechaP.slice(6, 8);
    _pago.nombre = pago.nombre.trim();
    _pago.fechafact = pago.fechafact.slice(0, 4) + "-" + pago.fechafact.slice(4, 6) + "-" + pago.fechafact.slice(6, 8);
    _pago.tipoFact = pago.tipoFact.replace('FACT ', '');
    _pago.nFactura = `${pago.factura1}-${pago.factura2}`;
    _pago.netoProv = `${_pago.netoProv.trim().slice(0, _pago.netoProv.trim().length - 2)}.${_pago.netoProv.trim().slice(-2)}`;
    _pago.ctaEmisora = `${pago.ctaEmisora1}${pago.ctaEmisora2}${pago.ctaEmisora3.padStart(6, '0')}`;
    return _pago;
}
const formatearDeudas = (deuda) => {
    let _deuda = deuda;
    _deuda.importeRet = parseFloat(deuda.importeRet.replace(",", ""));
    _deuda.nCuenta = deuda.nCuenta.replaceAll("-", "");
    _deuda.fecha = _deuda.fecha.slice(0, 4) + "-" + _deuda.fecha.slice(4, 6) + "-" + _deuda.fecha.slice(6, 8);
    return _deuda;
}
const filterPagos = (pagos = []) => {
    /* Se aplica la filtracion a la cuenta de pagos del ente EATT - pagos segun su nro de cuenta */
    console.log(pagos);
    let filterPagos = pagos.filter(({ cuit }) => cuit !== "30709204617");
    filterPagos = filterPagos.filter(({ cuit }) => cuit.length > 9 && cuit.length < 12);
    filterPagos = filterPagos.filter(({ ctaEmisora }) => ctaEmisora !== "71975050");
    filterPagos.find(({ cuit }) => cuit === "27341863711")
    console.log(filterPagos);
    /* filterPagos = deudas; */
    return filterPagos;
}
const filterDeudas = (deudas = []) => {

    /* let deudasFiltradas = deudas.filter(({ cuit }) => cuit === "30709204617"); */
    /* Se aplica la filtracion a la cuenta de deudas del ente EATT - deudas segun su nro de cuenta */
    let filterDeudas = deudas.filter(({ cuit }) => cuit !== "30709204617");
    filterDeudas = deudas.filter(({ cuit }) => cuit !== "30709204617");
    console.log(filterDeudas);
    /* filterDeudas = deudas.filter(({ codRet }) => codRet.trim() !== ""); */

    /* filterDeudas = filterDeudas.filter(({ cuit }) => cuit.length > 12); */

    /* filterDeudas = deudas; */
    /* console.log("deudas filtradas con el cuit 30709204617");
    console.log(deudasFiltradas);
    console.log(filterDeudas); */
    return filterDeudas;
}
export const subirPagos = async (pagos) => {
    const countPagos = {
        proveedores: [],
        ordenesDePago: [],
        detalleDePago: [],
        proveedoresRepetidos: [],
        pagosRepetidos: [],
        pagosFantasma: [],
        cantidad: 0
    }
    pagos.forEach(async (pago) => {
        const checkProv = await verificarProv(pago.cuit);
        const checkUserProv = await verificarUserProv(pago.cuit);
        const checkOrden = await verificarOrden(pago.nOrden);
        const checkOrdenFantasma = await verificarOrdenFantasma(pago.nOrden);
        if (!countPagos.ordenesDePago.includes(pago.nOrden)) {
            if (!checkProv) {
                if (!countPagos.proveedores.includes(pago.cuit)) {
                    countPagos.proveedores.push(pago.cuit);
                    const resProv = await cargarProv(pago);
                    const resUserPago = await cargarUserProv(pago);
                }
            } else {
                if (!checkUserProv) {
                    const resUserPago = await cargarUserProv(pago);
                }
                countPagos.proveedoresRepetidos.push(pago);
            }

            if (!checkOrdenFantasma) {
                if (!checkOrden) {
                    const resPago = await cargarOrden(pago);
                    /* console.log(resPago); */
                    countPagos.ordenesDePago.push(pago);
                } else {
                    if (pago.nOrden === "117241" || pago.nOrden === "116780" || pago.nOrden === "116777") {
                        console.log("existen y se actualizan")
                        console.log(pago);
                        console.log(checkOrden);
                    }
                    const resPago = await actualizarOrdenPago(pago);
                    /* console.log(resPago);
                    console.log(pago); */
                    countPagos.pagosRepetidos.push(pago);
                }
            } else {
                const idControl = checkOrdenFantasma.IdControl;
                const resPago = await actualizarPagosFantasmas(idControl, pago);
                countPagos.pagosFantasma.push(resPago);
            }

        }
    });
    return countPagos;
}
export const subirDeudas = async (deudas) => {
    const countDeudas = {
        deudas: [],
        deudasError: [],
        ordenesDePagoFantasmas: [],
        ordenesDePagoFantasmasError: [],
        deudasRepetidas: [],
    };
    const _deudasFilter = deudas;
    console.log(_deudasFilter);
    _deudasFilter.forEach(async (deuda) => {
        const checkOrden = await verificarOrden(deuda.nOrden);
        console.log(checkOrden);
        if (!checkOrden) {
            const fantasmaCheck = await cargarOrdenFantasma(deuda);
            console.log(fantasmaCheck);
            countDeudas.ordenesDePagoFantasmas.push(deuda.nOrden);
            if (!fantasmaCheck) countDeudas.ordenesDePagoFantasmasError.push(deuda.nOrden);
        };
    });
    _deudasFilter.forEach(async (deuda) => {
        const checkDetallePago = await verificarDetalleOrden(deuda.nOrden, deuda.codRet);
        if (!checkDetallePago) {
            const detalleCheck = await cargarDetallePago(deuda);
            if (!detalleCheck) countDeudas.deudasError.push(deuda.nOrden);
        } else {
            const detalleCheck = await actualizarDetallePago(deuda);
            if (!detalleCheck) countDeudas.deudasError.push(deuda.nOrden);
        };
    });
    console.log(countDeudas)
}
export const checkPagosRepeat = (pagos) => {
    let _pagos = pagos;
    let _checkPagosRepeat = [];
    const busqueda = _pagos.reduce((acc, _pagos) => {
        acc[_pagos.nOrden] = ++acc[_pagos.nOrden] || 0;
        return acc;
    }, {});

    console.log(busqueda);

    for (const key in busqueda) {
        const element = busqueda[key];
        if (element) {
            const filterExist = _pagos.map((_pago, idx) => _pago.nOrden === key && { _pago, index: idx }).filter(Boolean);
            _checkPagosRepeat.push(filterExist);
        };
    };
    return _checkPagosRepeat;
};

export const checkPagos = (pagos) => {

};
export const checkDeudas = (deudas) => {
    // Filtrar objetos con "codRet" igual a ""
    const deudasCheck = deudas.filter(deuda => deuda.codRet.trim() !== "");

    // Filtrar objetos con "codRet" diferente de ""
    const retFiltered = deudas.filter(deuda => deuda.codRet.trim() === "");

    // Devolver un objeto que contiene ambos arrays
    return { retFiltered, deudasCheck };
};
export const convertirFechaInput = (fecha) => {
    return fecha.split("/").reverse().join("-");
}

export function convertirFechaIso(fechaISO) {
    const fecha = new Date(fechaISO);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}