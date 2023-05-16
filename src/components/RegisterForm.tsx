import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
//Firebase imports
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase.ts';
import { Alert } from '@mui/material';

function RegisterForm() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const register = e => {
        e.preventDefault()
        setError('')
        // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
        setSuccess('User created');
        setError('');
        })
        .catch((error) => {
        setError(error.message);
        setSuccess('');
        });
    }

  return(
    <Form className='LoginForm' >
      { success && <Alert severity="success">{success}</Alert>}
      { error && <Alert severity="error">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={register}>
        Registrarse
      </Button>
    </Form>
    );
}

export default RegisterForm;