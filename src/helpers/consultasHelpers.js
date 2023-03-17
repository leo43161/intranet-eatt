import axios from "axios";
const Consultas = {};
const apiUrl = "http://10.15.15.151:3000/api/"

Consultas.verificarProv = async (cuit) => {
    const { data: proovedor } = await axios.get(
        apiUrl + "users/proveedor", { params: { cuit } }
    );
    console.log(proovedor.length);
    return proovedor.length > 0;
};

Consultas.verificarOrden = async (orden, cuit) => {
    const { data: ordenPago } = await axios.get(
        apiUrl + "pagos/orden", { params: { orden, cuit } }
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
        montoBase: orden.netoProv,
        pagada: 0,
        borrado: 0,
        activo: 1,
        cuit: orden.cuit,
        idCuentaEmisora: orden.ctaEmisora,
        libramiento: orden.libramiento
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
        montoR: orden.monto,
        activo: 1,
        borrado: 0,
        codRetencion: orden.codRet,
        idControl: orden.ordenPago
    }
    const { data: check } = await axios.post(
        apiUrl + "pagos/detalle", { params: { detalleOrden } }
    );
    console.log(check);
    return check;
};

export default Consultas;