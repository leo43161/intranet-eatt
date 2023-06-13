import jsPDF from 'jspdf';
import Consultas from '../helpers/consultasHelpers';
import { gananciasHTML, temHTML, ssHTML, saretHTML } from '../helpers/pdfsHelpers';

const GeneratePdf = ({ ret, children, pago }) => {
    const { traerProv } = Consultas;
    const retenciones = {
        "Gan": { config: { scale: 0.6072, hoja: "letter", margin: 30 }, html: gananciasHTML },
        "TEM": { config: { scale: 0.54, hoja: "letter", margin: 30 }, html: temHTML },
        "SS": { config: { scale: 0.6072, hoja: "letter", margin: 30 }, html: ssHTML },
        "SARET": { config: { scale: 0.4264, hoja: "a4", margin: 10 }, html: saretHTML },
    }
    const generatePdf = async () => {
        const { localidad, provincia, cp } = await traerProv(pago.Cuit);
        const _pago = { ...pago, localidad, provincia, cp };
        const { config: { scale, hoja, margin }, html } = retenciones[ret];
        let element = html(_pago);
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