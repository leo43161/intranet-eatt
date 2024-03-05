import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function DropZone({ setState, imagen }) {
    const [file, setFile] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
        setState(acceptedFiles[0]);
    }, [])

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'image/jpeg': [], 'image/gif': [], 'image/jpg': [], 'image/pjpeg': [], 'image/png': [], 'image/bmp': [], },
        maxSize: 500000
    });
    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        const errorsCode = {
            "file-invalid-type": "La imagen debe pertenecer a los siguientes formatos (.gif, .jpeg, .jpg, .pjpeg, .png, .bmp)",
            "file-too-large": "La imagen no tiene que pesar mas de 400kb",
        }
        return (
            <div key={file.path}>
                {errors.map(e => (
                    <h6 key={e.code} className='text-danger text-center' style={{ fontSize: "14px" }}>* {errorsCode[e.code]}</h6>
                ))}
            </div>
        )
    });
    return (
        <div {...getRootProps()} style={{ border: "dashed 3px #6C757D", height: "350px" }} className="col d-flex flex-column justify-content-center align-items-center rounded overflow-hidden">
            <input {...getInputProps()} />
            {!file && !imagen && <FontAwesomeIcon className="mb-2" size="3x" icon={faFileImage} />}
            {imagen && <img src={"https://www.institucionalturismotuc.gob.ar/public/img/" + imagen} className='h-100' alt="Previsualización" style={{ objectFit: "contain" }} />}
            {isDragActive ?
                <h4 className="mb-2 text-center">Suelte aquí</h4> :
                (
                    file ? (
                        <img src={URL.createObjectURL(file)} className='h-100' alt="Previsualización" style={{ objectFit: "contain" }} />
                    ) : !imagen && <h4 className="mb-2 text-center">Arrastre o haga clic aquí</h4>
                )
            }
            {fileRejectionItems}
        </div>
    )
}
