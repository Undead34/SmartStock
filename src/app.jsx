//#region IMPORTS
/*
Importaciones:
En esta parte, se están importando algunas bibliotecas necesarias para trabajar con React y también algunos estilos para el diseño visual de la aplicación.
*/
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import * as React from "react";

import PasswordReset from "./views/PasswordReset.jsx";
import NewPassword from "./views/NewPassword.jsx";
import Inventory from "./views/Inventory.jsx";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import Home from "./views/Home.jsx";
//#endregion

/*
La función App():
Esta función representa la estructura principal de la aplicación.
*/
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/app/*" element={<Inventory />} />
    </Routes>
  );
}

//#region RENDER
/*
La función render():
Esta función es la que toma el contenido creado con las funciones anteriores y lo muestra en la página web.
Primero, encuentra un elemento en el HTML con el ID "root" donde colocará la aplicación.
Luego, llama a la función ReactDOM.createRoot() para crear una "raíz" de la aplicación en ese elemento.
Finalmente, utiliza el método render() para mostrar el componente App que definimos antes, y lo coloca dentro de la raíz.
De esta manera, la aplicación se muestra en el sitio web.
*/
function render() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
      <Toaster richColors />
      <App />
    </HashRouter>
  );
}

render(); // Se llama a la función root aquí inicia la aplicación
//#endregion
