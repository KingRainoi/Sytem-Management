import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.ts';
import { useState } from 'react';

const useProfileSelector = (keyItem) => {
  const navigate = useNavigate();
  const [key, setKey] = useState(keyItem);
    console.log("Soy key");
    console.log(key);
  const onSelectionChange = (item) => {
    if (item === "logout") {
      auth.signOut()
        .then(() => {
          // Cierre de sesión exitoso
          navigate('/login-register-form');
        })
        .catch((error) => {
          // Manejo de errores en caso de que ocurra algún problema durante el cierre de sesión
          console.log(error);
        });
    } else {
      setKey(item);
    }
  };

  return [key, onSelectionChange];
};

export default useProfileSelector;