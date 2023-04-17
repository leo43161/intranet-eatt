import axios from "axios";
const Consultas = {};
const apiUrl = "http://10.15.15.151:3000/api/"

Consultas.listarPagos = async () => {
    const { data: pagos } = await axios.get(
        apiUrl + "pagos"
    );
    return pagos;
};

Consultas.verificarProv = async (cuit) => {
    const { data: proovedor } = await axios.get(
        apiUrl + "users/proveedor", { params: { cuit } }
    );
    console.log(proovedor.length);
    return proovedor.length > 0;
};

Consultas.verificarOrden = async (orden) => {
    const { data: ordenPago } = await axios.get(
        apiUrl + "pagos/orden", { params: { orden } }
    );
    return ordenPago.length > 0;
};

Consultas.verificarDetalleOrden = async (orden, ret) => {
    const { data: detalleOrden } = await axios.get(
        apiUrl + "pagos/detalle", { params: { orden, ret } }
    );
    return detalleOrden.length > 0;
};

Consultas.cargarOrden = async (orden) => {
    /* ACTUALIZAR LOS DATOS PARA PODER SUBIR LA ORDEN DE PAGO */
    const ordenPago = {
        codOp: orden.nOrden,
        factura: orden.nFactura,
        tipoFactura: orden.tipoFact,
        fechaPago: orden.fechaP,
        fechaFact: orden.fechafact,
        montoBase: orden.netoProv,
        pagada: 0,
        borrado: 0,
        activo: 1,
        cuit: orden.cuit,
        idCuentaEmisora: orden.ctaEmisora,
        libramiento: orden.libramiento
    }
    console.log("Esta es la ordern que se prepara para SUBIR")
    console.log(ordenPago);
    const { data: check } = await axios.post(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.cargarOrdenFantasma = async (deuda) => {
    /* ACTUALIZAR LOS DATOS PARA PODER SUBIR LA ORDEN DE PAGO */
    const ordenPago = {
        codOp: deuda.nOrden,
        factura: "0",
        tipoFactura: "",
        fechaPago: deuda.fecha,
        montoBase: deuda.importeRet,
        pagada: 0,
        borrado: 0,
        activo: 1,
        cuit: 0,
        idCuentaEmisora: deuda.nCuenta,
        libramiento: ""
    }
    console.log(ordenPago);
    const { data: check } = await axios.post(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.cargarProv = async (prov) => {
    const proveedor = {
        cuit: prov.cuit,
        nombreP: prov.razonSocial,
        domicilio: "",
        activo: 1,
        telefono: "",
        email: ""
    }
    const { data: check } = await axios.post(
        apiUrl + "users/proveedor", { params: { proveedor } }
    );
    return check;
};

Consultas.cargarDetallePago = async (orden) => {
    const detalleOrden = {
        porcentaje: 1,
        montoR: orden.importeRet,
        activo: 1,
        borrado: 0,
        codRetencion: orden.codRet,
        idControl: orden.nOrden
    }
    const { data: check } = await axios.post(
        apiUrl + "pagos/detalle", { params: { detalleOrden } }
    );
    console.log(check);
    return check;
};

export default Consultas;