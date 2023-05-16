import React,{useState} from 'react';
import { Tab } from '@headlessui/react';
import LoginForm from '../components/LoginForm.tsx';
import RegisterForm from '../components/RegisterForm.tsx';

function LoginRegisterForm() {
  return (
    <div>
        <Tab.Group>
            <Tab.List>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
            </Tab.List>

            <Tab.Panels>
                <Tab.Panel>
                    <LoginForm/>
                </Tab.Panel>   
                <Tab.Panel>
                    <RegisterForm/>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>    
    </div>
  );
}

export default LoginRegisterForm;