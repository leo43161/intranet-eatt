import { NumerosALetras } from 'numero-a-letras';
export const gananciasHTML = ({ cuit }) => `
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
export const temHTML = ({ Libramiento, NombreP, temId, Factura, Cuit, Domicilio, MontoBase, temP, TEM, FechaPago }) => `
<div class="" id="maintable" style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width: 1349px;">
            <div class="d-flex" style="margin-bottom: 90px;">
                <div class="col-12">
                    <div class="col-10">
                        <div class="d-flex">
                            <div class="col-2"></div>
                            <div class="col-6 ps-2 fw-bold">LIB ${Libramiento} - <span style="word-spacing: 0.7em;">${NombreP}<span/> </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-1 border border-dark d-flex justify-content-center align-items-center">
                                <h3 class="mb-0 fw-bold">DIM</h3>
                            </div>
                            <div
                                class="col-1 border border-start-0 border-dark d-flex justify-content-center align-items-center">
                                <img class="col-6" src="img/logo-tem.jpg" alt="">
                            </div>
                            <div class="col-4 border border-start-0 border-dark fw-bold">
                                <div class="text-center">Municipalidad de S. M. de Tucumán</div>
                                <div class="text-center border-top border-bottom border-dark">Direccion de Ingresos
                                    Municipales</div>
                                <div class="text-center">24 de Septiembre N° 334</div>
                            </div>
                            <div class="col-2 border border-start-0 border-dark text-center">
                                <p class="m-0">
                                    T.E.M
                                    <br>
                                    y
                                    <br>
                                    P. y P.
                                </p>
                            </div>
                            <div class="col-3 text-center border border-start-0 border-dark">
                                <p class="m-0">
                                    F. A. R. Nº 15
                                    <br>
                                    Nº
                                    <br>
                                    1050-${idTemFormat(temId)}
                                </p>
                            </div>
                        </div>
                        <div class="text-center border border-top-0 border-dark col-11">
                            <h3 class="fw-bold m-0">CONSTANCIA DE RETENCION</h3>
                        </div>
                        <div class="border border-top-0 border-dark col-11 d-flex">
                            <div style="font-size: 12px;"
                                class="col py-3 border-end border-dark text-center d-flex justify-content-center align-items-center">
                                AGENTE DE RETENCION</div>
                            <div style="font-size: 12px;" class="col border-end border-dark d-flex align-items-end">Nº
                                C.U.I.T. 30-70920461-7</div>
                            <div style="font-size: 12px;" class="col border-end border-dark d-flex align-items-end">Nº
                                AGENTE 1050</div>
                            <div style="font-size: 12px;"
                                class="col border-end border-dark d-flex align-items-end justify-content-center">MES 12
                            </div>
                            <div style="font-size: 12px;" class="col d-flex align-items-end justify-content-center">AÑO
                                2022</div>
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex align-items-end pt-3">
                            ORGANISMO, ENTIDAD O RAZON SOCIAL: ENTE AUTARQUICO TUCUMAN TURISMO
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex align-items-end pt-3">
                            DOMICILIO : 24 de SEPTIEMBRE 484 - S.M.T
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 py-3 border-end border-dark text-center d-flex justify-content-center">
                                CONTRIBUYENTE</div>
                            <div class="col-3 border-end border-dark text-center d-flex flex-column align-self-stretch">
                                <div>COMPROB. ORIGEN</div>
                                <div class="border-top border-dark flex-fill">${Factura}</div>
                            </div>
                            <div class="col d-flex align-items-end justify-content-center">${Cuit}</div>
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex align-items-end pt-3">
                            DOMICILIO: ${Domicilio}
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center fw-bold">TRIBUTO
                            </div>
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center fw-bold">MONTO
                                IMPONIBLE</div>
                            <div class="col-2 border-end border-dark text-center d-flex justify-content-center fw-bold">ALICUOTA
                            </div>
                            <div class="col-4 text-center d-flex justify-content-center fw-bold">TRIBUTO</div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center">T. E. M.
                            </div>
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-between px-1">
                                <span>$</span>
                                <span>${MontoBase}</span>
                            </div>
                            <div class="col-2 border-end border-dark text-center d-flex justify-content-center">${temP}%
                            </div>
                            <div class="col-4 text-center d-flex">
                                <div class="col-4 border-end border-dark"></div>
                                <div class="col-8 text-end fw-bold">$ ${TEM}</div>
                            </div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center"></div>
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-between px-1">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="col-2 border-end border-dark text-center d-flex justify-content-center">%</div>
                            <div class="col-4 text-center d-flex">
                                <div class="col-4 border-end border-dark"></div>
                                <div class="col-8 text-end"></div>
                            </div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col border-end border-dark d-flex align-items-end justify-content-center pt-5">
                                SELLO Y FIRMA</div>
                            <div class="col">
                                <div class="d-flex">
                                    <div
                                        class="col-4 border-end border-bottom border-dark text-center d-flex justify-content-center">
                                        TOTAL RETENIDO
                                    </div>
                                    <div class="col-8 text-center d-flex">
                                        <div class="col-4 border-bottom border-end border-dark"></div>
                                        <div class="col-8 border-bottom border-dark text-end fw-bold">$ ${TEM}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-2 text-center border-end border-dark">
                                <p>${FechaPago}</p>
                                <span>FECHA DE PAGO</span>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                ${NumerosALetras(TEM)} .-
                            </div>
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex justify-content-center">
                            <p>1 - Contribuyente</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <div class="col-12">
                    <div class="col-10">
                        <div class="d-flex">
                            <div class="col-2"></div>
                            <div class="col-6 ps-2 fw-bold">LIB ${Libramiento} - <span style="word-spacing: 0.7em;">${NombreP}<span/></div>
                        </div>
                        <div class="d-flex">
                            <div class="col-1 border border-dark d-flex justify-content-center align-items-center">
                                <h3 class="mb-0 fw-bold">DIM</h3>
                            </div>
                            <div
                                class="col-1 border border-start-0 border-dark d-flex justify-content-center align-items-center">
                                <img class="col-6" src="img/logo-tem.jpg" alt="">
                            </div>
                            <div class="col-4 border border-start-0 border-dark fw-bold">
                                <div class="text-center">Municipalidad de S. M. de Tucumán</div>
                                <div class="text-center border-top border-bottom border-dark">Direccion de Ingresos
                                    Municipales</div>
                                <div class="text-center">24 de Septiembre N° 334</div>
                            </div>
                            <div class="col-2 border border-start-0 border-dark text-center">
                                <p class="m-0">
                                    T.E.M
                                    <br>
                                    y
                                    <br>
                                    P. y P.
                                </p>
                            </div>
                            <div class="col-3 text-center border border-start-0 border-dark">
                                <p class="m-0">
                                    F. A. R. Nº 15
                                    <br>
                                    Nº
                                    <br>
                                    1050-${idTemFormat(temId)}
                                </p>
                            </div>
                        </div>
                        <div class="text-center border border-top-0 border-dark col-11">
                            <h3 class="fw-bold m-0">CONSTANCIA DE RETENCION</h3>
                        </div>
                        <div class="border border-top-0 border-dark col-11 d-flex">
                            <div style="font-size: 12px;"
                                class="col py-3 border-end border-dark text-center d-flex justify-content-center align-items-center">
                                AGENTE DE RETENCION</div>
                            <div style="font-size: 12px;" class="col border-end border-dark d-flex align-items-end">Nº
                                C.U.I.T. 30-70920461-7</div>
                            <div style="font-size: 12px;" class="col border-end border-dark d-flex align-items-end">Nº
                                AGENTE 1050</div>
                            <div style="font-size: 12px;"
                                class="col border-end border-dark d-flex align-items-end justify-content-center">MES 12
                            </div>
                            <div style="font-size: 12px;" class="col d-flex align-items-end justify-content-center">AÑO
                                2022</div>
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex align-items-end pt-3">
                            ORGANISMO, ENTIDAD O RAZON SOCIAL: ENTE AUTARQUICO TUCUMAN TURISMO
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex align-items-end pt-3">
                            DOMICILIO : 24 de SEPTIEMBRE 484 - S.M.T
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 py-3 border-end border-dark text-center d-flex justify-content-center">
                                CONTRIBUYENTE</div>
                            <div class="col-3 border-end border-dark text-center d-flex flex-column align-self-stretch">
                                <div>COMPROB. ORIGEN</div>
                                <div class="border-top border-dark flex-fill">${Factura}</div>
                            </div>
                            <div class="col d-flex align-items-end justify-content-center">${Cuit}</div>
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex align-items-end pt-3">
                            DOMICILIO: ${Domicilio}
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center fw-bold">TRIBUTO
                            </div>
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center fw-bold">MONTO
                                IMPONIBLE</div>
                            <div class="col-2 border-end border-dark text-center d-flex justify-content-center fw-bold">ALICUOTA
                            </div>
                            <div class="col-4 text-center d-flex justify-content-center fw-bold">TRIBUTO</div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center">T. E. M.
                            </div>
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-between px-1">
                                <span>$</span>
                                <span>${MontoBase}</span>
                            </div>
                            <div class="col-2 border-end border-dark text-center d-flex justify-content-center">${temP}%
                            </div>
                            <div class="col-4 text-center d-flex">
                                <div class="col-4 border-end border-dark"></div>
                                <div class="col-8 text-end fw-bold">$ ${TEM}</div>
                            </div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-center"></div>
                            <div class="col-3 border-end border-dark text-center d-flex justify-content-between px-1">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="col-2 border-end border-dark text-center d-flex justify-content-center">%</div>
                            <div class="col-4 text-center d-flex">
                                <div class="col-4 border-end border-dark"></div>
                                <div class="col-8 text-end"></div>
                            </div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col border-end border-dark d-flex align-items-end justify-content-center pt-5">
                                SELLO Y FIRMA</div>
                            <div class="col">
                                <div class="d-flex">
                                    <div
                                        class="col-4 border-end border-bottom border-dark text-center d-flex justify-content-center">
                                        TOTAL RETENIDO
                                    </div>
                                    <div class="col-8 text-center d-flex">
                                        <div class="col-4 border-bottom border-end border-dark"></div>
                                        <div class="col-8 border-bottom border-dark text-end fw-bold">$ ${TEM}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="font-size: 12px;" class="border border-top-0 border-dark col-11 d-flex">
                            <div class="col-2 text-center border-end border-dark">
                                <p>${FechaPago}</p>
                                <span>FECHA DE PAGO</span>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                ${NumerosALetras(TEM)} .-
                            </div>
                        </div>
                        <div style="font-size: 12px;"
                            class="border border-top-0 border-dark col-11 d-flex justify-content-center">
                            <p>2 - Agente de Retencion</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`
export const ssHTML = () => `
<div class="" id="maintable" style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width: 1349px;">
            <div class="d-flex">
                <div class="col-8 border border-dark">
                    <div class="border-bottom border-dark">
                        <div class="d-flex">
                            <div class="col-4 text-center py-1 border-end border-dark">
                                <img src="img/AFIP-LOGO.jpg" class="img-fluid col-9" alt="">
                                <h3 class="fw-bold mb-0">F.2004</h3>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <div class="d-flex flex-column align-items-center justify-content-center col-9">
                                    <h4 class="text-center">CERTIFICADO DE RETENCIÓN/ PERCEPCIÓN de la SEGURIDAD SOCIAL
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom border-dark">
                        <div class="d-flex py-1">
                            <div class="col-1">

                            </div>
                            <div class="col-5">
                                <h6 class="mb-0 fw-bold">Certificado AFIP N°</h6>
                            </div>
                            <div class="col-6">
                                <h6 class="mb-0">3070920461720220000000527 (348d)</h6>
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom border-dark">
                        <div class="d-flex py-1">
                            <div class="col-1">

                            </div>
                            <div class="col-5">
                                <h6 class="mb-0 fw-bold">Fecha Retención/Percepción</h6>
                            </div>
                            <div class="col-6">
                                <h6 class="mb-0">06/12/2022</h6>
                            </div>
                        </div>
                    </div>
                    <div class="py-1">
                        <div class="border-bottom border-dark">
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold">
                                    A -
                                </div>
                                <div class="col-5">
                                    <h6 class="mb-0 fw-bold">Datos del Agente de Retención/Percepción</h6>
                                </div>
                                <div class="col-6">
                                    <h5 class="mb-0"></h5>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Apellido y Nombres o Denominación</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">ENTE AUTARQUICO TUCUMAN TURISMO</h6>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">CUIT N°</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">30709204617</h6>
                                </div>
                            </div>

                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold">
                                    B -
                                </div>
                                <div class="col-5">
                                    <h6 class="mb-0 fw-bold">Datos del Sujeto Retenido/Percibido</h6>
                                </div>
                                <div class="col-6">
                                    <h5 class="mb-0"></h5>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Apellido y Nombres o Denominación</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">ARAOZ LUCIANA</h6>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">CUIT/CUIL/CDI</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">27170420832</h6>
                                </div>
                            </div>

                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold">
                                    C -
                                </div>
                                <div class="col-5">
                                    <h6 class="mb-0 fw-bold">Datos de la Retención/Percepción practicada</h6>
                                </div>
                                <div class="col-6">
                                    <h5 class="mb-0"></h5>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Impuesto</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">353-RETENCIONES CONTRIB.SEG.SOCIAL</h6>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Régimen</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">755-RETENCIÓN GENERAL DE CONTRIBUCIONES</h6>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Comprobante que origina la retención/
                                        percepción</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">FACTURA-00004-00000198</h6>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Monto del comprobante
                                        que origina la retención/percepción</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">531530.90</h6>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold"></div>
                                <div class="col-5">
                                    <h6 class="mb-0">Monto de la Retención/Percepción</h6>
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-0">5315.30</h6>
                                </div>
                            </div>

                            <div class="d-flex">
                                <div class="col-1 text-center fw-bold">
                                    D -
                                </div>
                                <div class="col-5">
                                    <h6 class="mb-0 fw-bold">Otros datos a incluir en el certificado</h6>
                                </div>
                                <div class="col-6">
                                    <h5 class="mb-0"></h5>
                                </div>
                            </div>
                        </div>
                        <div class="text-center py-2 px-2 border-bottom border-dark">
                            <p class="mb-0">El presente certificado se expide sobre la base de los datos declarados y aportados por
                                el agente de retención/percepción
                                a la fecha de impresión de la presente consulta, el cual podría ser pasible de
                                modificaciones por el agente en cuestión.
                            </p>
                        </div>
                        <div class="d-flex flex-column justify-content-between" style="height: 100px;">
                            <h6 class="fw-bold text-center">Conserve este Certificado como comprobante de Retención/Percepción</h6>
                            <div class="d-flex justify-content-evenly">
                                <div>Emisión: 13/12/2022</div>
                                <div>Impresión: 16/12/2022</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
`
export const saretHTML = ({ NombreP, Cuit, Domicilio, localidad, provincia, TipoFactura, Factura, SARET, saretP, MontoBase, montoTotal,fechaFactura }) => `
<div class="d-flex position-relative" id="maintable-3" style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width: 1349px; word-spacing: 0.25em;">
<img src="img/0.jpg" style="width: 1349px;" alt="">
<div id="agente-1">
    <p style="position: absolute; top: 130px; left: 170px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 163px; left: 125px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 163px; left: 365px;" id="agente">400525</p>
    <p style="position: absolute; top: 163px; left: 590px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 200px; left: 160px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 200px; left: 385px;" id="mes">${getMes(fechaFactura)}</p>
    <p style="position: absolute; top: 200px; left: 540px;" id="año">${getAnio(fechaFactura)}</p>
    <p style="position: absolute; top: 255px; left: 200px;" id="razon-social">${NombreP}</p>
    <p style="position: absolute; top: 300px; left: 160px;" id="cuit-dni">${cuitFormat(Cuit)}</p>
    <p style="position: absolute; top: 350px; left: 45px;" id="domicilio-fiscal">${Domicilio}</p>
    <p style="position: absolute; top: 395px; left: 45px;" id="localidad">${localidad}</p>
    <p style="position: absolute; top: 395px; left: 345px;" id="provincia">${provincia}</p>
    <p style="position: absolute; top: 495px; left: 40px;" id="num-comprobante">${TipoFactura} / ${facturaFormatSARET(Factura)}</p>
    <p style="position: absolute; top: 495px; left: 210px;" id="monto-retencion">$${montoFormat(montoTotal)}</p>
    <p style="position: absolute; top: 495px; left: 400px;" id="porcentaje">${saretP}%</p>
    <p style="position: absolute; top: 495px; left: 530px;" id="importe-retenido">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 610px; left: 530px;" id="importe-depositar">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 650px; left: 190px; text-transform: uppercase;" id="importe-letras">${NumerosALetras(SARET)}</p>
</div>
<div id="agente-2">
    <p style="position: absolute; top: 130px; left: 855px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 163px; left: 800px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 163px; left: 1045px;" id="agente">400525</p>
    <p style="position: absolute; top: 163px; left: 1270px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 200px; left: 840px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 200px; left: 1075px;" id="mes">${getMes(fechaFactura)}</p>
    <p style="position: absolute; top: 200px; left: 1230px;" id="año">${getAnio(fechaFactura)}</p>
    <p style="position: absolute; top: 255px; left: 890px;" id="razon-social">${NombreP}</p>
    <p style="position: absolute; top: 300px; left: 850px;" id="cuit-dni">${cuitFormat(Cuit)}</p>
    <p style="position: absolute; top: 350px; left: 730px;" id="domicilio-fiscal">${Domicilio}</p>
    <p style="position: absolute; top: 395px; left: 730px;" id="localidad">${localidad}</p>
    <p style="position: absolute; top: 395px; left: 1030px;" id="provincia">${provincia}</p>
    <p style="position: absolute; top: 495px; left: 725px;" id="num-comprobante">${TipoFactura} / ${facturaFormatSARET(Factura)}</p>
    <p style="position: absolute; top: 495px; left: 895px;" id="monto-retencion">$${montoFormat(montoTotal)}</p>
    <p style="position: absolute; top: 495px; left: 1090px;" id="porcentaje">${saretP}%</p>
    <p style="position: absolute; top: 495px; left: 1215px;" id="importe-retenido">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 610px; left: 1215px;" id="importe-depositar">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 650px; left: 875px; text-transform: uppercase;" id="importe-letras">${NumerosALetras(SARET)}</p>
</div>
<div id="agente-3">
    <p style="position: absolute; top: 1081px; left: 170px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 1115px; left: 125px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 1115px; left: 365px;" id="agente">400525</p>
    <p style="position: absolute; top: 1115px; left: 590px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 1152px; left: 160px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 1152px; left: 385px;" id="mes">${getMes(fechaFactura)}</p>
    <p style="position: absolute; top: 1152px; left: 540px;" id="año">${getAnio(fechaFactura)}</p>
    <p style="position: absolute; top: 1207px; left: 200px;" id="razon-social">${NombreP}</p>
    <p style="position: absolute; top: 1252px; left: 160px;" id="cuit-dni">${cuitFormat(Cuit)}</p>
    <p style="position: absolute; top: 1302px; left: 45px;" id="domicilio-fiscal">${Domicilio}</p>
    <p style="position: absolute; top: 1347px; left: 45px;" id="localidad">${localidad}</p>
    <p style="position: absolute; top: 1347px; left: 345px;" id="provincia">${provincia}</p>
    <p style="position: absolute; top: 1447px; left: 40px;" id="num-comprobante">${TipoFactura} / ${facturaFormatSARET(Factura)}</p>
    <p style="position: absolute; top: 1447px; left: 210px;" id="monto-retencion">$${montoFormat(montoTotal)}</p>
    <p style="position: absolute; top: 1447px; left: 400px;" id="porcentaje">${saretP}%</p>
    <p style="position: absolute; top: 1447px; left: 530px;" id="importe-retenido">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 1562px; left: 530px;" id="importe-depositar">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 1602px; left: 190px; text-transform: uppercase;" id="importe-letras">${NumerosALetras(SARET)}</p>
</div>
<div id="agente-4">
    <p style="position: absolute; top: 1081px; left: 855px;" id="denominacion">ENTE AUTARQUICO TUCUMAN
        TURISMO</p>
    <p style="position: absolute; top: 1115px; left: 810px;" id="cuil">30-70920461-7</p>
    <p style="position: absolute; top: 1115px; left: 1050px;" id="agente">400525</p>
    <p style="position: absolute; top: 1115px; left: 1275px;" id="establecimiento">0</p>
    <p style="position: absolute; top: 1152px; left: 845px;" id="obligacion">30-70920461-7</p>
    <p style="position: absolute; top: 1152px; left: 1070px;" id="mes">${getMes(fechaFactura)}</p>
    <p style="position: absolute; top: 1152px; left: 1225px;" id="año">${getAnio(fechaFactura)}</p>
    <p style="position: absolute; top: 1207px; left: 885px;" id="razon-social">${NombreP}</p>
    <p style="position: absolute; top: 1252px; left: 845px;" id="cuit-dni">${cuitFormat(Cuit)}</p>
    <p style="position: absolute; top: 1302px; left: 730px;" id="domicilio-fiscal">${Domicilio}</p>
    <p style="position: absolute; top: 1347px; left: 730px;" id="localidad">${localidad}</p>
    <p style="position: absolute; top: 1347px; left: 1030px;" id="provincia">${provincia}</p>
    <p style="position: absolute; top: 1447px; left: 725px;" id="num-comprobante">${TipoFactura} / ${facturaFormatSARET(Factura)}</p>
    <p style="position: absolute; top: 1447px; left: 895px;" id="monto-retencion">$${montoFormat(montoTotal)}</p>
    <p style="position: absolute; top: 1447px; left: 1085px;" id="porcentaje">${saretP}%</p>
    <p style="position: absolute; top: 1447px; left: 1215px;" id="importe-retenido">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 1562px; left: 1215px;" id="importe-depositar">$${montoFormat(SARET)}</p>
    <p style="position: absolute; top: 1602px; left: 875px; text-transform: uppercase;" id="importe-letras">${NumerosALetras(SARET)}</p>
</div>
</div>
`;

const cuitFormat = (cuit) => {
    const _cuit = String(cuit);
    const prefijo = _cuit.slice(0, 2);
    const dni = _cuit.slice(2, 10);
    const sufijo = _cuit.slice(10);

    return `${prefijo}-${dni}-${sufijo}`;
}

const facturaFormatSARET = (factura) => {
    console.log(factura);
    const parts = factura.split('-');
    const firstPart = parts[0].trim();
    const secondPart = parts[1].trim();
    // Formatear las partes con ceros a la izquierda
    const formattedFirstPart = firstPart.padStart(4, '0');
    const formattedSecondPart = secondPart.padStart(8, '0');
    // Construir el número en el nuevo formato
    const formattedNumber = `${formattedFirstPart}-${formattedSecondPart}`

    return formattedNumber;
}

const montoFormat = (monto) => {
    const numeroFormateado = monto.toLocaleString('es-ES', {
        minimumFractionDigits: 1, // Muestra al menos 1 decimal
        maximumFractionDigits: 1, // Muestra como máximo 1 decimal
    });
    return numeroFormateado;
}
const idTemFormat = (id) => {
    const formatteId = id.toString().padStart(8, '0');
    return formatteId;
}

function getMes(fecha) {
    // Divide la cadena en partes usando '/' como separador
    const partes = fecha.split('/');

    // Obtén el mes como una cadena y asegúrate de tener dos dígitos usando padStart
    const mes = partes[1].padStart(2, '0');
    return mes;
}
function getAnio(fecha) {
    // Divide la cadena en partes usando '/' como separador
    const partes = fecha.split('/');

    // Obtén el mes como una cadena y asegúrate de tener dos dígitos usando padStart
    const anio = partes[2]
    return anio;
}