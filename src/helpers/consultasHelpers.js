import axios from "axios";
const Consultas = {};
const apiUrl = "http://10.15.15.151:3000/api/"

Consultas.listarCuentas = async () => {
    const { data: cuentas } = await axios.get(
        apiUrl + "cuentas"
    );
    return cuentas;
};

Consultas.listarPagos = async (cuenta) => {
    const { data: pagos } = await axios.get(
        apiUrl + "pagos", { params: { cuenta } }
    );
    return pagos;
};

Consultas.listarProv = async () => {
    const { data: prov } = await axios.get(
        apiUrl + "proveedores"
    );
    return prov;
};

Consultas.verificarProv = async (cuit) => {
    const { data: proovedor } = await axios.get(
        apiUrl + "proveedores", { params: { cuit } }
    );
    return proovedor.length > 0;
};

Consultas.verificarUserProv = async (cuit) => {
    const { data: proovedor } = await axios.get(
        apiUrl + "users", { params: { cuit } }
    );
    return proovedor.length > 0;
};

Consultas.verificarOrden = async (orden) => {
    const { data: ordenPago } = await axios.get(
        apiUrl + "pagos/orden", { params: { orden } }
    );
    return ordenPago.length > 0;
};

Consultas.verificarOrdenFantasma = async (orden) => {
    const { data: ordenPago } = await axios.get(
        apiUrl + "pagos/orden", { params: { orden } }
    );
    return ordenPago.length > 0 ? ordenPago[0].fantasma && ordenPago[0] : false;
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
        libramiento: orden.libramiento,
        fantasma: 0
    }
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
        libramiento: "",
        fantasma: 1
    }
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
        apiUrl + "proveedores", { params: { proveedor } }
    );
    return check;
};

Consultas.cargarUserProv = async (userProv) => {
    const _userProv = {
        cuit: userProv.cuit,
        nombreU: userProv.cuit,
        nombre: userProv.razonSocial,
        password: userProv.cuit,
        apellido: "",
        activo: 1,
        tipo: 5,
        email: ""
    }
    const { data: check } = await axios.post(
        apiUrl + "users", { params: { _userProv } }
    );
    return check;
};

Consultas.cargarDetallePago = async (orden) => {
    const detalleOrden = {
        porcentaje: 0,
        montoR: orden.importeRet,
        activo: 1,
        borrado: 0,
        codRetencion: orden.codRet,
        idControl: orden.nOrden
    }
    const { data: check } = await axios.post(
        apiUrl + "pagos/detalle", { params: { detalleOrden } }
    );
    return check;
};

Consultas.editarDetallePago = async (orden) => {
    const detalleOrden = {
        idDOP: orden.idDOP,
        porcentaje: orden.porcentaje,
        montoR: orden.montoR,
        borrado: 0,
        activo: 1,
        codRetencion: orden.cod,
        idControl: orden.idControl
    }
    const { data: check } = await axios.put(
        apiUrl + "pagos/detalle", { params: { detalleOrden } }
    );
    return check;
};

Consultas.editarOrdenPago = async (orden) => {
    const ordenPago = {
        idControl: orden.Id,
        codOp: orden.codop,
        factura: orden.Factura,
        tipoFactura: orden.TipoFactura,
        fechaPago: orden.FechaPago,
        fechaFact: orden.fechaFactura,
        montoBase: orden.MontoBase,
        pagada: 0,
        borrado: 0,
        activo: 1,
        cuit: orden.Cuit,
        idCuentaEmisora: orden.IdCuentaEmisora,
        libramiento: orden.Libramiento,
        fantasma: 0
    }
    const { data: check } = await axios.put(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.actualizarPagosFantasmas = async (idControl, orden) => {
    const ordenPago = {
        idControl,
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
        libramiento: orden.libramiento,
        fantasma: 0
    }
    const { data: check } = await axios.put(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

export default Consultas;