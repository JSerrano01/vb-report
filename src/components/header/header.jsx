import { Button } from '@mui/material';
import './header.css'
import React from 'react'

const header = (props) => {
    const close = () => {
        props.setToken(null);
    }
    return (
        <div className="header">
            {props.token && <Button variant="link" onClick={close}>Cerrar Sesión</Button>}
        </div>
    )
}

export default header
