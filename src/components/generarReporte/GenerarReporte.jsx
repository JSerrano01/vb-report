import { Button, Divider, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ref, uploadBytes } from "firebase/storage";
import CircularProgress from '@mui/material/CircularProgress';
import { storage, db } from '../../firebase';
import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';
import './GenerarReporte.css'
import { Box } from '@mui/system';

const GenerarReporte = (props) => {
    const {token} = props;
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [cedula, setCedula] = useState('')
    const [num, setNum] = useState('')
    const [direccionResidencia, setDireccionResidencia] = useState('')
    const [direccionHechos, setDireccionHechos] = useState('')
    const [currentUser, setCurrentUser] = useState({})

    const queryData = async () => {
        console.log('token', props.token.email);
        const q = query(collection(db, "users"), where("email", "==", props.token.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setCurrentUser({id: doc.id, ...doc.data()});
        });
    }

    useEffect(() => {
        queryData();
    }, [])

    const sendReport = () => {
        if (!file)
            return;
        setLoading(true);
        const fileName = `${token.email}/${uuidv4()}`
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, file.data).then(async(snapshot) => {
            console.log('Uploaded a blob or file!');
            console.log(snapshot);
            await addDoc(collection(db, 'reports'), {
                email: token.email,
                url: fileName,
                //nombres: currentUser['name'],
                //apellidos: currentUser['lastName'],
                cedula,
                num,
                direccionResidencia,
                direccionHechos,
                date: Date.now().toString()
                
            });
            emailjs.send('service_6wy1skc', 'template_f4xtnk9', {from_name: `${currentUser['name']} ${currentUser['lastName']}`, message: `Dirección del hecho: ${direccionHechos}`}, 'user_j1RW9bmeyOcqMDyNbgNra')
            .then((result) => {
                console.log(result.text);
            }).catch((error) => {
                console.log(error.text);
            });
        }).finally(() => {
            setLoading(false);
            cleanFields();
        })
    }

    const cleanFields = () => {
        setNombres('');
        setApellidos('');
        setCedula('');
        setNum('');
        setDireccionResidencia('');
        setDireccionHechos('');
        setFile(null);
    }

    const handleFile = (e) => {
        const f = e.target.files[0];
        const newFile = {
            data: f,
            src: URL.createObjectURL(e.target.files[0])
        }
        console.log(newFile);
        setFile(newFile);
    }

    return (
        <div className="container-reporte">
            <div className="container-reporte__form">
                <div className="container-reporte__img">
                    {file ? <img width="400px" src={file.src}/> 
                    : <> {'No hay imagenes seleecionadas'}
                        <Button
                        variant="contained"
                        component="label"
                        sx={{backgroundColor: '#92A575', margin: '30px 0'}}
                        >
                        <FileUploadIcon sx={{ fontSize: 40 }} />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFile}
                            />
                        </Button>
                     </>}
                </div>
                { loading && <CircularProgress /> }
                <Box sx={{display: 'flex'}}>
                    <TextField
                        /*id="outlined-multiline-static"
                        disabled
                        value={currentUser.name}
                        onChange={({target: {value}}) => setNombres(value)}
                        fullWidth*/
                    />
                    <span className="spacer"></span>
                    <TextField
                       /* id="outlined-multiline-static"
                        disabled
                        value={currentUser.lastName}
                        onChange={({target: {value}}) => setApellidos(value)}
                        fullWidth*/
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    label="Cedula"
                    required
                    value={cedula}
                    onChange={({target: {value}}) => setCedula(value)}
                    fullWidth
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Número de contacto"
                    required
                    value={num}
                    onChange={({target: {value}}) => setNum(value)}
                    fullWidth
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Dirección de residencia"
                    required
                    value={direccionResidencia}
                    onChange={({target: {value}}) => setDireccionResidencia(value)}
                    fullWidth
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Dirección de los hechos"
                    required
                    value={direccionHechos}
                    onChange={({target: {value}}) => setDireccionHechos(value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    onClick={sendReport}
                    sx={{backgroundColor: '#92A575', marginTop: '10vh,10vw',}}
                    >
                    Enviar reporte
                </Button>
            </div>
        </div>
    )
}

export default GenerarReporte
