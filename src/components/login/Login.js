import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, addDoc } from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  } from 'firebase/auth';
import {db, auth} from '../../firebase'
import './Login.css'
import { Box } from '@mui/system';

const Login = (props) => {

    const { setToken } = props;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const signIn = () => {
        signInWithEmailAndPassword(auth, user, password)
          .then((userCredential) => {
            // Signed in
            const newUser = userCredential.user;
            console.log(newUser);
            setToken(newUser);
            // localStorage.setItem('token', newUser.accessToken);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            console.log(errorMessage);
          });
      };

      const signUp = () => {
        createUserWithEmailAndPassword(auth, user, password)
        .then(async (userCredential) => {
          // Signed in
          const token = userCredential.user;
          await addDoc(collection(db, 'users'), {
            name,
            email: user,
            lastName
          });
          setToken(token);
          // localStorage.setItem('token', token.accessToken);
      }).catch(error => {
          console.error(error);
      });
    }

    const onSumbitForm = (e) => {
        e.preventDefault();
        // validate fields
        signIn();
    }

    const onSumbitRegister = (e) => {
        e.preventDefault();
        // validate fields
        signUp();
    }

    const onChangeUser = ({target: {value}}) => {
        setUser(value);
    }

    const onChangePassword = ({target: {value}}) => {
        setPassword(value);
    }

    const onChangeName = ({target: {value}}) => {
        setName(value);
    }

    const onChangeLastName = ({target: {value}}) => {
        setLastName(value);
    }

    return (
            <div className="container-login">
            {!register  ? 
                <form onSubmit={onSumbitForm} className="container-login__form">
                <h3 className="container-login__form__title">TECH TRASH</h3>
                <div className="container-login__form__conatiner">
                    <TextField required value={user} onChange={onChangeUser} fullWidth margin="dense" className="container-login__form__input" type="email" id="user" label="Email" variant="filled" />
                </div>
                <div className="container-login__form__conatiner">
                    <TextField required value={password} onChange={onChangePassword} fullWidth className="container-login__form__input" type="password" id="password" label="Contraseña" variant="filled" />
                </div>
                <Button type="sumbit" className="container-login__form__button" variant="outlined">Ingresar</Button>
                <Button onClick={() => setRegister(true)} className="container-login__form__button" variant="link">Registrarse</Button>
            </form>
                : <form onSubmit={onSumbitRegister} className="container-login__form">
                <h3 className="container-login__form__title">VB Login</h3>
                <Box>
                    <TextField className="container-login__form__input__row" required value={name} onChange={onChangeName} type="text" id="name" label="Nombres" variant="filled" />
                    <span className="spacer"> </span>
                    <TextField className="container-login__form__input__row" required value={lastName} onChange={onChangeLastName}  type="text" id="lastname" label="Apellidos" variant="filled" />
                </Box>
                <TextField required value={user} onChange={onChangeUser} fullWidth className="container-login__form__input" type="email" id="user" label="Email" variant="filled" />
                <TextField required value={password} onChange={onChangePassword} fullWidth className="container-login__form__input" type="password" id="password" label="Contraseña" variant="filled" />
                <Button type="sumbit" className="container-login__form__button" variant="link">Registrarse</Button>
                <Button onClick={() => setRegister(false)} className="container-login__form__button" variant="link">Volver</Button>
            </form>}
            </div>
    )
}

export default Login
