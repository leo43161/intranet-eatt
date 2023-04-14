import Consultas from "./consultasHelpers";
const { verificarProv, verificarOrden, verificarDetalleOrden, cargarOrden, cargarProv, cargarDetallePago, cargarOrdenFantasma } = Consultas;
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
    _pago.ctaEmisora = `${pago.ctaEmisora1}${pago.ctaEmisora2}${pago.ctaEmisora3}`;
    return _pago;
}
const formatearDeudas = (pago) => {
    let _pago = pago;
    _pago.importeRet = parseFloat(pago.importeRet.replace(",", ""));
    _pago.nCuenta = pago.nCuenta.replaceAll("-", "");
    _pago.fecha = convertirFecha(pago.fecha);
    return _pago;
}

const filterPagos = (pagos = []) => {
    /* Se aplica la filtracion a la cuenta de pagos del ente EATT - pagos segun su nro de cuenta */
    let filterPagos = pagos.filter(({ cuit }) => cuit !== "30709204617");
    /* filterPagos = deudas.filter(({ cuit }) => cuit.length < 10); */
    /* filterPagos = deudas; */
    console.log(filterPagos);
    return filterPagos;
}
const filterDeudas = (deudas = []) => {
    /* let deudasFiltradas = deudas.filter(({ cuit }) => cuit === "30709204617"); */
    /* Se aplica la filtracion a la cuenta de deudas del ente EATT - deudas segun su nro de cuenta */
    let filterDeudas = deudas.filter(({ cuit }) => cuit !== "30709204617");
    filterDeudas = filterDeudas.filter(({ codRet }) => codRetVerif[codRet]);
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
        cantidad: 0
    }
    pagos.forEach(async (pago) => {
        const checkProv = await verificarProv(pago.cuit);
        const checkOrden = await verificarOrden(pago.nOrden);
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
}

export const subirDeudas = async (deudas) => {
    const countDeudas = {
        deudas: [],
        deudasError: [],
        ordenesDePagoFantasmas: [],
        ordenesDePagoFantasmasError: [],
        deudasRepetidas: [],
    };
    const _deudasFilter = await checkDeudas(deudas);
    _deudasFilter.forEach(async (deuda) => {
        const checkOrden = await verificarOrden(deuda.nOrden);
        if (!checkOrden) {
            const fantasmaCheck = await cargarOrdenFantasma(deuda);
            countDeudas.ordenesDePagoFantasmas.push(deuda.nOrden);
           if (!fantasmaCheck) countDeudas.ordenesDePagoFantasmasError.push(deuda.nOrden);
        };
    });
    deudas.forEach(async (deuda) => {
        const checkDetallePago = await verificarDetalleOrden(deuda.nOrden, deuda.codRet);
        if (!checkDetallePago) {
           const detalleCheck = await cargarDetallePago(deuda);
           if (!detalleCheck) countDeudas.deudasError.push(deuda.nOrden);
        };
    });
}

export const checkPagos = (pagos) => {
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
        };
    };
    console.log(_checkPagos);
    return _checkPagos;
};

export const checkDeudas = async (deudas) => {
    const valoresUnicos = {};
    const _deudasFilter = deudas.filter(deuda => {
        const valor = deuda.nOrden;
        const existe = valoresUnicos[valor];
        valoresUnicos[valor] = true;
        return !existe;
    });
    return _deudasFilter;
};

const convertirFecha = (fecha) => {
    let hoy = new Date();
    let anio = hoy.getFullYear();
    let fechaCompleta = fecha + "/" + anio;
    let fechaConvertida = new Date(fechaCompleta.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
    let anioConvertido = fechaConvertida.getFullYear();
    let mesConvertido = ("0" + (fechaConvertida.getMonth() + 1)).slice(-2);
    let diaConvertido = ("0" + fechaConvertida.getDate()).slice(-2);
    return anioConvertido + "-" + mesConvertido + "-" + diaConvertido;
}