import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Home() {
  // Estado para controlar la animación de salida y transición
  const [unmounting, setUnmounting] = useState(false);

  const navigate = useNavigate();

  // Efecto que maneja la animación de salida y navegación
  useEffect(() => {
    let id = setTimeout(() => {
      if (unmounting === "login") {
        navigate("/login");
      } else if (unmounting === "app") {
        navigate("/app");
      } else {
        setUnmounting(false);
      }
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [unmounting, navigate]);

  // Efecto para verificar el token y redirigir
  useEffect(() => {
    let id = setTimeout(async () => {
      const token = localStorage.getItem("TOKEN");
      const id = localStorage.getItem("ID");

      if (token) {
        const valid = await window.SmartStock.invoke("smartstock:login:token", { token, id });
        if (valid) {
          setUnmounting("app");
        } else {
          setUnmounting("login");
        }
      } else {
        setUnmounting("login");
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div
      style={{ right: unmounting ? "100%" : "0", opacity: unmounting ? "0" : "1" }}
      className="flex h-full w-full flex-col gap-4 select-none transition-all absolute opacity-100 right-0"
    >
      <div className="flex flex-1 justify-center items-center flex-col gap-4">
        <h1 className="text-6xl font-bold title-gradient">SmartStock</h1>
        <Loader />
      </div>
      <div className="flex justify-center items-center font-semibold">
        © 2023 Trina Rojas & Luis Salazar. Todos los derechos reservados.
      </div>
    </div>
  );
}

export default Home;
