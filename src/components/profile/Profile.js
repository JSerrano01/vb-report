import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { updateEmail } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import {db, auth} from '../../firebase'
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import './Profile.css'

const Profile = (props) => {
    // const { enqueueSnackbar } = useSnackbar();
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


    const onSumbitForm = async (e) => {
        e.preventDefault();

        updateEmail(auth.currentUser, currentUser.email).then( async () => {
            try {
                await setDoc(doc(db, "users", currentUser.id), {
                    email: currentUser.email,
                    name: currentUser.name,
                    lastName: currentUser.lastName
                });
                // enqueueSnackbar('Se actualizó correctamente el perfil', {
                //     variant: 'success'
                // });
            } catch (err) {
                console.log(err);
                // enqueueSnackbar('Error al actualizar el perfil!', {
                //     variant: 'error'
                // });
            }
        }).catch((error) => {
            console.log(error);
            // enqueueSnackbar('Error al actualizar el perfil!', {
            //     variant: 'error'
            // });
        });
    }

    const onChangeUser = ({target: {value}}) => {
        const newCurrentUser = {...currentUser};
        newCurrentUser.email = value;
        setCurrentUser(newCurrentUser);
    }

    const onChangeName = ({target: {value}}) => {
        const newCurrentUser = {...currentUser};
        newCurrentUser.name = value;
        setCurrentUser(newCurrentUser);
    }

    const onChangeLastName = ({target: {value}}) => {
        const newCurrentUser = {...currentUser};
        newCurrentUser.lastName = value;
        setCurrentUser(newCurrentUser);
    }

    return (
        <SnackbarProvider maxSnack={3}>
            <div className="container-login">
                <form onSubmit={onSumbitForm} className="container-login__form">
                    <h3 className="container-login__form__title">Actualizar Perfil</h3>
                    <Box>
                        <TextField className="container-login__form__input__row" required value={currentUser.name} onChange={onChangeName} type="text" helperText="Nombre" id="name" variant="filled" />
                        <span className="spacer"> </span>
                        <TextField className="container-login__form__input__row" required value={currentUser.lastName} onChange={onChangeLastName} helperText="Apellido" type="text" id="lastname" variant="filled" />
                    </Box>
                    <TextField required value={currentUser.email} onChange={onChangeUser} fullWidth className="container-login__form__input" type="email" helperText="Email" id="user" variant="filled" />
                    <Button type="sumbit" className="container-login__form__button" variant="link">Actualizar</Button>
                </form>
            </div>
        </SnackbarProvider>
    )
}

export default Profile
