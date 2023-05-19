import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from '../firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate} from 'react-router-dom';
import AdministratorSalesPanel from '../screens/AdministratorSalesPanel.tsx';

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logged,setLogged] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth,email, password);
            // Inicio de sesión exitoso
            navigate('/sales', { replace: true });
        } catch (error) {
            // Manejo de errores
            setLogged(false);
            console.log(error);
        }
    };

    return (
    <Form className='LoginForm' onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        onChange={(event) => setEmail(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        onChange={(event) => setPassword(event.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;