import React from "react";
import jsPDF from 'jspdf';
import { ret1HTML, ret2HTML, ret3HTML, ret4HTML } from '../helpers/pdfsHelpers';

const GeneratePdf = ({ ret, children }) => {
    const retenciones = {
        "ret1": { config: { scale: 0.6072186836518046, hoja: "letter", margin: 30 }, html: ret1HTML },
        "ret2": { config: { scale: 0.6072186836518046, hoja: "letter", margin: 30 }, html: ret2HTML },
        "ret3": { config: { scale: 0.6072186836518046, hoja: "letter", margin: 30 }, html: ret3HTML },
        "ret4": { config: { scale: 0.42644922164566346, hoja: "a4", margin: 10 }, html: ret4HTML },
    }
    const generatePdf = () => {
        const { config: { scale, hoja, margin }, html } = retenciones[ret];
        let element = html({ cuit: "123546545" });
        const doc = new jsPDF("p", "pt", hoja);
        doc.html(element, {
            x: margin,
            y: margin,
            html2canvas: {
                scale: scale,
            },
            callback: function (doc) {
                doc.output('dataurlnewwindow', { filename: 'pdf.pdf' });
            }
        });
    }
    return (

        <div className="button-container" onClick={generatePdf}>
            {children}
        </div>

    );
};

export default GeneratePdf;