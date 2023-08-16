import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { FaUserPen } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

/**
 * Render function for the Login component.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
export default function Register() {
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  useEffect(() => {
    const unsubscribe = window.SmartStock.receive("smartstock:register:user", (event, data) => {
      switch (data.CODE) {
        case "ALREADY_EXISTS":
          setError("Lo sentimos, pero el usuario ya está registrado")
          break;
        case "OK":
          setError("¡Todo listo!")
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
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;
    const repassword = event.target.repassword.value;

    // Validaciones básicas
    if (!name || !email || !password || !repassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return;
    }

    if (password !== repassword) {
      setError("Las contraseñas no coinciden")
      return;
    }

    // Si todas las validaciones son correctas, puedes enviar los datos al servidor
    window.SmartStock.send("smartstock:register:user", { name, email, password });

    event.target.name.value = ""
    event.target.email.value = ""
    event.target.password.value = ""
    event.target.repassword.value = ""
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#f2f6ff] text-white gap-2">
      <div className="p-10 flex flex-col bg-[#ffffff] w-[32rem] shadow-xl rounded-lg">
        <div className="flex flex-col">
          <div className="text-center mb-8">
            <div className="text-2xl text-[#1c7cb4] font-semibold mb-2">¡Bienvenido, futuro usuario!</div>
            <div className={`text-sm text-gray-400 transition-all ${error ? error === "¡Todo listo!" ? "bg-[#0fff6322] rounded-sm border border-solid border-[#00ff0d0f] text-[#6e6f72]" : "bg-[#ff0f0f22] border border-solid border-[#ff00000f] text-[#6e6f72]" : ""}`}>
              {error ? error : "Regístrate para empezar y acceder a tu cuenta."}
            </div>
          </div>

          <div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handlerSubmit}>
              <div className="flex flex-col gap-6 mb-4 text-[#1c7cb4]">
                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="name" type="text" placeholder="Por favor, ingrese su nombre completo" />
                  <FaUserPen className="text-[#f96611]" />
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="email" type="email" placeholder="Introduzca su dirección de correo electrónico" />
                  <MdEmail className="text-[#f96611]" />
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="password" type={!showPassword ? "password" : "text"} placeholder="Por razones de seguridad, elija una contraseña" />
                  {showPassword ? <AiFillEyeInvisible onClick={() => { setShowPassword(!showPassword) }} className="text-[#f96611] cursor-pointer" /> : <AiFillEye onClick={() => { setShowPassword(!showPassword) }} className="text-[#f96611] cursor-pointer" />}
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="repassword" type={!showRePassword ? "password" : "text"} placeholder="Confirme su contraseña ingresándola nuevamente" />
                  {showRePassword ? <AiFillEyeInvisible onClick={() => { setShowRePassword(!showRePassword) }} className="text-[#f96611] cursor-pointer" /> : <AiFillEye onClick={() => { setShowRePassword(!showRePassword) }} className="text-[#f96611] cursor-pointer" />}
                </div>
              </div>

              <div className="flex items-center justify-center mb-2">
                <button className="flex-1 bg-[#f96611] text-xl rounded-md p-2">Registrarse</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-[#ffffff] w-[32rem] shadow-xl rounded-lg p-2 text-center">
        <span className="text-gray-400">
          ¿Ya tiene cuenta? {" "}
          <Link to={"/login"} className="text-[#1c7cb4] underline">Iniciar sesión</Link>
        </span>
      </div>
    </div>
  )
}
