import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

export default function DropZone({ setState }) {
    const [file, setFile] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
        setState(acceptedFiles[0]);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: { 'text/plain': [".txt"] } })

    return (
        <div {...getRootProps()} style={{ border: "dashed 3px #6C757D" }} className="col-8 d-flex justify-content-center h-100 align-items-center rounded">
            <input {...getInputProps()} />
            <div className="flex-column d-flex p-4 text-wrap overflow-hidden">
                <FontAwesomeIcon className="mb-2" size="3x" icon={faFileLines} />
                {
                    isDragActive ?
                        <h4 className="m-0">Suelte aquí</h4> :
                        file ? <h4 className="m-0 text-wrap">{file.name}</h4> :
                            <h4 className="m-0">Arrastre o haga click aquí</h4>
                }
            </div>
        </div>
    )
}
