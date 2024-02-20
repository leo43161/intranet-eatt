import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';

export default function ActividadList({
    actividades,
    setActividades,
    nuevaActividad,
    setNuevaActividad
}) {
    const agregarActividad = () => {
        if (nuevaActividad.trim() !== '') {
            setActividades([...actividades, nuevaActividad]);
            setNuevaActividad('');
        }
    };

    const eliminarActividad = (index) => {
        const nuevasActividades = [...actividades];
        nuevasActividades.splice(index, 1);
        setActividades(nuevasActividades);
    };

    return (
        <div className='d-flex justify-content-between'>
            <Form.Group className="mb-2 col" controlId="localidad">
                <div className='d-flex mb-3 align-items-center gap-2'>
                    <Form.Label className='fw-bold h5 mb-0'>Actividades</Form.Label>
                    <div className='col-4 d-flex gap-2'>
                        <Form.Control
                            type="text"
                            name="actividad"
                            placeholder="ej: Trekking"
                            value={nuevaActividad}
                            onChange={(e) => setNuevaActividad(e.target.value)}
                        />
                        <Button variant="primary" onClick={agregarActividad}>
                            <FontAwesomeIcon size="sm" color='#FFFFFF' icon={faPlus} />
                        </Button>
                    </div>
                </div>
                <div className='bg-secondary rounded p-2' style={{ minHeight: "30vh" }}>
                    <div className='d-flex gap-1 flex-wrap'>
                        {actividades.map((actividad, index) => (
                            <div
                                key={index}
                                className='bg-dark px-2 rounded d-flex align-items-center gap-1'
                            >
                                <span className='text-white'>{actividad}</span>
                                <FontAwesomeIcon style={{ cursor: "pointer" }} color='#FFFFFF' onClick={() => eliminarActividad(index)} icon={faTimes} />
                            </div>
                        ))}
                    </div>
                </div>
            </Form.Group>
        </div>
    );
};
