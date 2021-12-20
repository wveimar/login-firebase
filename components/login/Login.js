import { useState } from "react";
import { firebaseApp } from "../../firebase/credenciales";
import {getAuth,createUserWithEmailAndPassword}  from "firebase/auth";

const auth = getAuth(firebaseApp);

const Login = () => {
    const [isRegistrando, setIsRegistrando] = useState(false);

    async function registrarUsuario(email, password, rol) {
        const infoUsuario = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then((usuarioFirebase) => {
          return usuarioFirebase;
        });
        console.log(infoUsuario);
    };

function submitHandler(e) {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const rol = e.target.elements.rol.value;
       
        if (isRegistrando){
            registrarUsuario(email, password,rol)
        }else{

        }
    }
    return (
        <div>
            <h1>{isRegistrando ? "Registrate" : "Iniciar Sesion"}</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Correo Electronico
                    <input type="email" id="email" />
                </label>
                <label>
                    Contraseña
                    <input type="password" id="password" />
                </label>
                <label>
                    <select id="rol">
                        <option value="admin">administrador</option>
                        <option value="usuario">Usuario</option>
                    </select>
                </label>
                <input type="submit" value={isRegistrando ? 'Registrate' : "Iniciar Sesion"} />
            </form>
            <button onClick={() => setIsRegistrando(!isRegistrando)}>
                {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
            </button>
        </div>
    )
}

export default Login
