
function formatearTxt(txt) {
    const contenido = txt;
    console.log(contenido);
    const arrayData = contenido.split(/\r\n|\r|\n/, -1);
    const listaPagos = [];
    arrayData.forEach((element) => {
        let pago = {};
        pago.ctaEmisora = element.substring(2, 10);
        pago.fechaEmision = `${element.substring(10, 14)}-${element.substring(14, 16)}-${element.substring(16, 18)}`;
        pago.ejercicio = element.substring(10, 14);
        pago.cheque = element.substring(18, 26);
        pago.lote = element.substring(28, 34);
        pago.alterno = element.substring(40, 51);
        pago.cuit = element.substring(51, 62);
        pago.beneficiarios = element.substring(62, 122);
        pago.ctaDestino = element.substring(134, 144);
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
    console.log(listaPagos);
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