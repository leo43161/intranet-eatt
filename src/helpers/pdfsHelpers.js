export const ret1HTML = ({ cuit }) => `
<div class="" id="maintable" style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width: 1349px;">
            <div class="d-flex">
                <div class="col-8">
                    <div>
                        <div class="d-flex">
                            <div class="col-5">
                                <img src="img/AFIP-LOGO-1.jpg" class="img-fluid col-9" alt="">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <div class="d-flex flex-column align-items-center justify-content-between col-10">
                                    <h3 class="text-center">SI.CO.RE. - Sistema de Control de Retenciones</h3>
                                    <div class="text-center">
                                        <p><span class="fw-bold">Certificado N°</span> : 0000-2022-000547</p>
                                        <p><span class="fw-bold">Fecha</span> : 07/12/2022 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <h3 class="mb-4">A. - Datos del agente de Retencion</h3>
                            <div class="ps-4">
                                <p class="mb-0"><span class="fw-bold">Apellido y Nombre o Denominacion</span> : ENTE
                                    AUTARTICO
                                    TUCUMAN TURISMO</p>
                                <p class="mb-0"><span class="fw-bold">C.U.I.T. N°</span> : ${cuit}</p>
                                <p class="mb-0"><span class="fw-bold">Domicilio</span> : Calle: 24 DE SEPTIEMBRE
                                    Nro: 484 Localidad:
                                    S. M. DE TUCUMAN Provincia: Tucuman C.P.: 4000 </p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h3 class="mb-4">B. - Datos del agente de Retencion</h3>
                            <div class="ps-4">
                                <p class="mb-0"><span class="fw-bold">Apellido y Nombre o Denominacion</span> : ENTE
                                    AUTARTICO
                                    TUCUMAN TURISMO</p>
                                <p class="mb-0"><span class="fw-bold">C.U.I.T. N°</span> : 30-70090461-7</p>
                                <p class="mb-0"><span class="fw-bold">Domicilio</span> : Calle: 24 DE SEPTIEMBRE
                                    Nro: 484 Localidad:
                                    S. M. DE TUCUMAN Provincia: Tucuman C.P.: 4000 </p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h3 class="mb-4">C. - Datos de la Retencion Practicada</h3>
                            <div class="mb-4 ps-4">
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Domicilio</span>
                                    </div>
                                    <div class="col">
                                        <span>: Impto. a la Ganancias</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Régimen</span>
                                    </div>
                                    <div class="col">
                                        <span>: Locaciones de Obra y/o Servicios no ejecutados en
                                            relación de dependencia</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Comprobante que origina la Retención</span>
                                    </div>
                                    <div class="col">
                                        <span>: 01 - Factura / Tique Factura / Tique Nro.
                                            00002-00000505</span>
                                    </div>
                                </div>


                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Monto del Comprobante que origina la Retención</span>
                                    </div>
                                    <div class="col">
                                        <span>: $ 4.076.546,30</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Monto de la Retención</span>
                                    </div>
                                    <div class="col">
                                        <span>: $ 77.050,92</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Imposibilidad de Retención</span>
                                    </div>
                                    <div class="col">
                                        <span>: NO</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4 ps-4">
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Firma del Agente de Retención</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ps-4 mb-4">
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Aclaración:</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col">
                                        <span class="fw-bold">Cargo:</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center border border-dark px-5">
                                Declaro que los datos consignados en este Formulario son correctos y completos y que
                                he
                                confeccionado la
                                presente utilizando la aplicación (software) entregada y aprobada por la AFIP sin
                                omitir ni falsear
                                dato
                                alguno que deba contener, siendo fiel expresión de la verdad.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
`;
export const ret2HTML = () => `

`
export const ret4HTML = () => `
<div class="d-flex position-relative" id="maintable-3" style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width: 1349px;">
<img src="img/0.jpg" style="width: 1349px;" alt="">
<div id="agente-1">
    <p style="position: absolute; top: 130px; left: 170px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 163px; left: 125px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 163px; left: 365px;" id="agente">400525</p>
    <p style="position: absolute; top: 163px; left: 590px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 200px; left: 160px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 200px; left: 385px;" id="mes">12</p>
    <p style="position: absolute; top: 200px; left: 540px;" id="año">2022</p>
    <p style="position: absolute; top: 255px; left: 200px;" id="razon-social">ARAOZ LUCIANA</p>
    <p style="position: absolute; top: 300px; left: 160px;" id="cuit-dni">27-17042083-2</p>
    <p style="position: absolute; top: 350px; left: 45px;" id="domicilio-fiscal">AV ACONQUIJA 2163</p>
    <p style="position: absolute; top: 395px; left: 45px;" id="localidad">AV YB</p>
    <p style="position: absolute; top: 395px; left: 345px;" id="provincia">TUCUMAN</p>
    <p style="position: absolute; top: 495px; left: 40px;" id="num-comprobante">B / 0004-00000200</p>
    <p style="position: absolute; top: 495px; left: 210px;" id="monto-retencion">$310.023,60</p>
    <p style="position: absolute; top: 495px; left: 400px;" id="porcentaje">3,5%</p>
    <p style="position: absolute; top: 495px; left: 530px;" id="importe-retenido">$10.850,83</p>
    <p style="position: absolute; top: 610px; left: 530px;" id="importe-depositar">$10.850,83</p>
    <p style="position: absolute; top: 650px; left: 190px;" id="importe-letras">DIEZ MIL OCHOCIENTOS
        CINCUENTA CON 83/100</p>
</div>
<div id="agente-2">
    <p style="position: absolute; top: 130px; left: 855px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 163px; left: 800px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 163px; left: 1045px;" id="agente">400525</p>
    <p style="position: absolute; top: 163px; left: 1270px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 200px; left: 840px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 200px; left: 1075px;" id="mes">12</p>
    <p style="position: absolute; top: 200px; left: 1230px;" id="año">2022</p>
    <p style="position: absolute; top: 255px; left: 890px;" id="razon-social">ARAOZ LUCIANA</p>
    <p style="position: absolute; top: 300px; left: 850px;" id="cuit-dni">27-17042083-2</p>
    <p style="position: absolute; top: 350px; left: 730px;" id="domicilio-fiscal">AV ACONQUIJA 2163</p>
    <p style="position: absolute; top: 395px; left: 730px;" id="localidad">AV YB</p>
    <p style="position: absolute; top: 395px; left: 1030px;" id="provincia">TUCUMAN</p>
    <p style="position: absolute; top: 495px; left: 725px;" id="num-comprobante">B / 0004-00000200</p>
    <p style="position: absolute; top: 495px; left: 895px;" id="monto-retencion">$310.023,60</p>
    <p style="position: absolute; top: 495px; left: 1090px;" id="porcentaje">3,5%</p>
    <p style="position: absolute; top: 495px; left: 1215px;" id="importe-retenido">$10.850,83</p>
    <p style="position: absolute; top: 610px; left: 1215px;" id="importe-depositar">$10.850,83</p>
    <p style="position: absolute; top: 650px; left: 875px;" id="importe-letras">DIEZ MIL OCHOCIENTOS
        CINCUENTA CON 83/100</p>
</div>
<div id="agente-3">
    <p style="position: absolute; top: 1081px; left: 170px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 1115px; left: 125px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 1115px; left: 365px;" id="agente">400525</p>
    <p style="position: absolute; top: 1115px; left: 590px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 1152px; left: 160px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 1152px; left: 385px;" id="mes">12</p>
    <p style="position: absolute; top: 1152px; left: 540px;" id="año">2022</p>
    <p style="position: absolute; top: 1207px; left: 200px;" id="razon-social">ARAOZ LUCIANA</p>
    <p style="position: absolute; top: 1252px; left: 160px;" id="cuit-dni">27-17042083-2</p>
    <p style="position: absolute; top: 1302px; left: 45px;" id="domicilio-fiscal">AV ACONQUIJA 2163</p>
    <p style="position: absolute; top: 1347px; left: 45px;" id="localidad">AV YB</p>
    <p style="position: absolute; top: 1347px; left: 345px;" id="provincia">TUCUMAN</p>
    <p style="position: absolute; top: 1447px; left: 40px;" id="num-comprobante">B / 0004-00000200</p>
    <p style="position: absolute; top: 1447px; left: 210px;" id="monto-retencion">$310.023,60</p>
    <p style="position: absolute; top: 1447px; left: 400px;" id="porcentaje">3,5%</p>
    <p style="position: absolute; top: 1447px; left: 530px;" id="importe-retenido">$10.850,83</p>
    <p style="position: absolute; top: 1562px; left: 530px;" id="importe-depositar">$10.850,83</p>
    <p style="position: absolute; top: 1602px; left: 190px;" id="importe-letras">DIEZ MIL OCHOCIENTOS
        CINCUENTA CON 83/100</p>
</div>
<div id="agente-4">
    <p style="position: absolute; top: 1081px; left: 855px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 1115px; left: 810px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 1115px; left: 1050px;" id="agente">400525</p>
    <p style="position: absolute; top: 1115px; left: 1275px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 1152px; left: 845px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 1152px; left: 1070px;" id="mes">12</p>
    <p style="position: absolute; top: 1152px; left: 1225px;" id="año">2022</p>
    <p style="position: absolute; top: 1207px; left: 885px;" id="razon-social">ARAOZ LUCIANA</p>
    <p style="position: absolute; top: 1252px; left: 845px;" id="cuit-dni">27-17042083-2</p>
    <p style="position: absolute; top: 1302px; left: 730px;" id="domicilio-fiscal">AV ACONQUIJA 2163</p>
    <p style="position: absolute; top: 1347px; left: 730px;" id="localidad">AV YB</p>
    <p style="position: absolute; top: 1347px; left: 1030px;" id="provincia">TUCUMAN</p>
    <p style="position: absolute; top: 1447px; left: 725px;" id="num-comprobante">B / 0004-00000200</p>
    <p style="position: absolute; top: 1447px; left: 895px;" id="monto-retencion">$310.023,60</p>
    <p style="position: absolute; top: 1447px; left: 1085px;" id="porcentaje">3,5%</p>
    <p style="position: absolute; top: 1447px; left: 1215px;" id="importe-retenido">$10.850,83</p>
    <p style="position: absolute; top: 1562px; left: 1215px;" id="importe-depositar">$10.850,83</p>
    <p style="position: absolute; top: 1602px; left: 875px;" id="importe-letras">DIEZ MIL OCHOCIENTOS
        CINCUENTA CON 83/100</p>
</div>
</div>
`;
