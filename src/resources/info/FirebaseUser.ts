import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.ts';



export const useLogout = () => {
    const navigate = useNavigate();

    auth.signOut().then(() => {
        // Cierre de sesión exitoso
        navigate('/ruta-de-destino'); // Reemplaza '/ruta-de-destino' con la ruta a la que deseas redirigir después del cierre de sesión
    })
    .catch((error) => {
        // Manejo de errores en caso de que ocurra algún problema durante el cierre de sesión
        console.log(error);
    });
};
