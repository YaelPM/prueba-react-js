import React, { useState } from 'react';
import usersData from '../users.json';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Validar nombre de usuario con expresión regular (solo letras y números permitidos)
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
      setError('Nombre de usuario no válido. Solo se permiten letras y números.');
      return;
    }

    // Validar contraseña con expresión regular (al menos una letra mayúscula, una minúscula y un número)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordPattern.test(password)) {
      setError('Contraseña no válida. Debe contener al menos una letra mayúscula, una minúscula y un número.');
      return;
    }

    const user = usersData.find((user) => user.username === username && user.password === password);

    if (user) {
      Swal.fire({
        title: 'Inicio de sesión exitoso!',
        text: 'Bienvenido a la página de prueba',
        icon: 'success',
        confirmButtonText: 'Okey :)'
      })
      navigate("/Home");
    } else {
      setError('Nombre de usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 mt-5">
            <div className="card-body">
              <h1 className="text-center mb-4">Iniciar sesión</h1>
              <div className="form-group mb-4"> 
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mb-3"> 
                <input
                  type={showPassword ? 'text' : 'password'} // Cambiar el tipo de input según el estado showPassword
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPasswordCheckbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // Alternar estado showPassword
                />
                <label className="form-check-label" htmlFor="showPasswordCheckbox">
                  Mostrar contraseña
                </label>
              </div>
              <div className="form-group text-center mt-4">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Iniciar sesión
                </button>
              </div>
              {error && <p className="mt-3 text-danger text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
