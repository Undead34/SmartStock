import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { BiSolidLock } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { Link } from "react-router-dom"

export default function Login() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = window.SmartStock.receive("smartstock:login:user", (event, data) => {
      switch (data.CODE) {
        case "INVALID_PASSWORD_EMAIL":
          setError("Correo electrónico o contraseña no válidos")
          break;
        case "ERROR_VERIFYING_PASSWORD":
          setError("Se ha producido un error en el servidor al intentar verificar la contraseña")
          break;
        case "LOGIN_SUCCESS":
          localStorage.setItem("TOKEN", data.TOKEN)
          localStorage.setItem("ID", data.ID)
          console.log(data)
          setError(null)
          navigate("/")
          break;
        default:
          setError("¡Se ha producido un error de servidor desconocido!")
          console.error(data.ERROR, data.CODE);
          break;
      }
    })
    return unsubscribe
  }, [])

  function handlerSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    // Validaciones básicas
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("Correo electrónico o contraseña no válidos")
      return;
    }

    window.SmartStock.send("smartstock:login:user", { email, password });
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#f2f6ff] text-white gap-2">
      <div className="p-10 flex flex-col bg-white w-[32rem] shadow-xl rounded-lg">
        <div className="flex flex-col">
          <div className="text-center mb-8">
            <div className="text-2xl text-[#1c7cb4] font-semibold mb-2">Bienvenido de nuevo</div>
            <div className={`text-sm text-gray-400 ${error ? "bg-[#ff0f0f22] border border-solid border-[#ff00000f] text-[#6e6f72]" : ""}`}>
              {error ? error : "Introduzca sus credenciales para acceder a su cuenta"}
            </div>
          </div>

          <div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handlerSubmit}>
              <div className="flex flex-col gap-6 mb-4 text-[#1c7cb4]">
                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="email" type="email" placeholder="Introduzca su email" />
                  <MdEmail className="text-[#f96611]" />
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="password" type="password" placeholder="Introduzca su contraseña" />
                  <BiSolidLock className="text-[#f96611]" />
                </div>
              </div>

              <div className="flex items-center justify-center mb-2">
                <button className="flex-1 bg-[#f96611] text-xl rounded-md p-2">Iniciar sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white w-[32rem] shadow-xl rounded-lg p-2 text-center">
        <span className="text-gray-400">
          ¿Ha olvidado su contraseña? {" "}
          <Link to={"/password-reset"} className="text-[#1c7cb4] underline">Restablecer contraseña</Link>
        </span>

        <span className="text-gray-400">
          ¿No tiene cuenta? {" "}
          <Link to={"/register"} className="text-[#1c7cb4] underline">Regístrese</Link>
        </span>
      </div>
    </div >
  )
}
