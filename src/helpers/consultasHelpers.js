import axios from "axios";
const Consultas = {};
const apiUrl = process.env.urlServer + "api/"
const queryPostOrden = ({ codOp, factura, fechaPago, fechaFact, tipoFactura, montoBase, pagada, borrado, activo, cuit, idCuentaEmisora, libramiento, fantasma }) => `CALL sp_InsertarOrdenPago(${codOp},'${factura}','${fechaPago}','${fechaFact}','${tipoFactura ? tipoFactura : "A"}',${montoBase},${pagada},${borrado},${activo},${cuit},${idCuentaEmisora},'${libramiento}', ${fantasma});`;


Consultas.traerProv = async (cuit) => {
    const { data: proovedor } = await axios.get(
        apiUrl + "proveedores", { params: { cuit } }
    );
    return proovedor[0];
};

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
Consultas.listarPrest = async () => {
    const { data: prest } = await axios.get(
        apiUrl + "prestadores"
    );
    return prest;
};
Consultas.listarLocalidades = async () => {
    const { data: localidades } = await axios.get(
        apiUrl + "localidades"
    );
    return localidades;
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
        idCuentaEmisora: orden.nCuenta,
        libramiento: orden.libramiento,
        fantasma: 0
    }
    if (ordenPago.codOp === "117241" || ordenPago.codOp === "116780" || ordenPago.codOp === "116777") {
        console.log(ordenPago);
        console.log(queryPostOrden(ordenPago));
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
        fechaFact: deuda.fecha,
        montoBase: deuda.importeRet,
        pagada: 0,
        borrado: 0,
        activo: 1,
        cuit: 0,
        idCuentaEmisora: deuda.nCuenta,
        libramiento: "",
        fantasma: 1
    }
    console.log(queryPostOrden(ordenPago));
    const { data: check } = await axios.post(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.cargarProv = async (prest) => {
    const proveedor = {
        cuit: prest.cuit,
        nombreP: prest.razonSocial,
        domicilio: "",
        localidad: "",
        provincia: "",
        cp: "",
        activo: 1,
        telefono: "",
        email: ""
    }
    const { data: check } = await axios.post(
        apiUrl + "proveedores", { params: { proveedor } }
    );
    return check;
};

Consultas.crearProv = async (prov) => {
    const proveedor = {
        cuit: prov.Cuit,
        nombreP: prov.NombreP,
        domicilio: prov.Domicilio,
        localidad: prov.localidad,
        provincia: prov.provincia,
        cp: prov.cp,
        activo: 1,
        telefono: prov.Telefono,
        email: prov.email
    }
    const { data: check } = await axios.post(
        apiUrl + "proveedores", { params: { proveedor } }
    );
    return check;
};

Consultas.crearPrestador = async (prestador) => {
    const queryPostPrest = ({
        titulo,
        responsable,
        direccion,
        idLocalidad,
        telefono,
        email,
        web,
        facebook,
        instagram,
        actividades,
        visible,
    }) => `CALL sp_InsertarPrestador("${titulo}","${responsable}","${direccion}",${idLocalidad},"${telefono}","${email}","${web}","${facebook}","${instagram}","${actividades}",${visible ? 1 : 0});`;
    console.log(queryPostPrest(prestador));
    const { data: check } = await axios.post(
        apiUrl + "prestadores", { params: { prestador } }
    );
    return check;
};
Consultas.editarPrestador = async (prest) => {
    const { data: check } = await axios.put(
        apiUrl + "prestadores", { params: { prest } }
    );
    return check;
};

Consultas.crearUserProv = async (userProv) => {
    const _userProv = {
        cuit: userProv.Cuit,
        nombreU: userProv.Cuit,
        nombre: userProv.NombreP,
        password: userProv.password,
        apellido: "",
        activo: 1,
        tipo: 5,
        email: userProv.email
    }
    const { data: check } = await axios.post(
        apiUrl + "users", { params: { _userProv } }
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

Consultas.editarProveedor = async (proveedor) => {
    const { data: check } = await axios.put(
        apiUrl + "proveedores", { params: { proveedor } }
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
Consultas.statesPrestador = async (prest) => {
    const ordenPago = {
        ...prest,
        activo: 0
    }
    const { data: check } = await axios.put(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};
Consultas.desactivarOrdenPago = async (orden) => {
    const ordenPago = {
        idControl: orden.Id,
        codOp: orden.codop,
        factura: orden.Factura,
        tipoFactura: orden.TipoFactura,
        fechaPago: convertirFormatoFecha(orden.FechaPago),
        fechaFact: convertirFormatoFecha(orden.fechaFactura),
        montoBase: orden.MontoBase,
        pagada: 0,
        borrado: 0,
        activo: 0,
        cuit: orden.Cuit,
        idCuentaEmisora: orden.IdCuentaEmisora,
        libramiento: orden.Libramiento,
        fantasma: 0
    }
    console.log("esta editando");
    console.log(ordenPago);
    const { data: check } = await axios.put(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.actualizarOrdenPago = async (orden) => {
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
        idCuentaEmisora: orden.nCuenta,
        libramiento: orden.libramiento,
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
        idCuentaEmisora: orden.nCuenta,
        libramiento: orden.libramiento,
        fantasma: 0
    }
    const { data: check } = await axios.put(
        apiUrl + "pagos/orden", { params: { ordenPago } }
    );
    return check;
};

Consultas.actualizarDetallePago = async (orden) => {
    const detalleOrden = {
        porcentaje: 0,
        montoR: orden.importeRet,
        borrado: 0,
        activo: 1,
        codRetencion: orden.codRet,
        idControl: orden.nOrden
    }
    const { data: check } = await axios.put(
        apiUrl + "pagos/detalle", { params: { detalleOrden } }
    );
    return check;
};

function convertirFormatoFecha(fecha) {
    var partes = fecha.split('/');
    var dia = partes[0];
    var mes = partes[1];
    var anio = partes[2];
    var nuevaFecha = anio + '-' + mes.padStart(2, '0') + '-' + dia.padStart(2, '0');
    return nuevaFecha;
}

export default Consultas;