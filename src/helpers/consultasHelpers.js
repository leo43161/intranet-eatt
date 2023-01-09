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
    const ordenPago = {
        codOp: orden.ordenPago,
        factura: "",
        tipoFactura: null,
        fechaPago: orden.fechaEmision,
        montoBase: orden.monto,
        pagada: 0,
        borrado: 0,
        activo: 1,
        cuit: orden.cuit,
        idCuentaEmisora: orden.ctaEmisora,
        libramiento: 0
    }
    const { data: check } = await axios.post(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.cargarProv = async (prov) => {
    const proveedor = {
        cuit: prov.cuit,
        nombreP: prov.beneficiarios.trim(),
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
    console.log(detalleOrden);
    const { data: check } = await axios.post(
        apiUrl + "pagos/detalle", { params: { detalleOrden } }
    );
    return check;
};

export default Consultas;