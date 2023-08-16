import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export default function NewPassword() {
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const navigate = useNavigate()

  async function handlerSubmit(event) {
    event.preventDefault()

    const password = event.target.password.value;
    const repassword = event.target.repassword.value;

    // Validaciones básicas
    if (!password || !repassword) {
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

    
    const response = await window.SmartStock.invoke("smartstock:change:password", {
      id: new URLSearchParams(location.hash.split("new-password").at(-1)).get("id"),
      password,
    });
    
    if (!response.ERROR) {
      setError("¡Todo listo!")
      navigate("/")
    } else {
      console.log(response, new URLSearchParams(location.hash.split("new-password").at(-1)).get("id"))
      setError("¡Oops, se ha producido un error al cambiar su contraseña.!")
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#f2f6ff] text-white gap-2">
      <div className="p-10 flex flex-col bg-[#ffffff] w-[32rem] shadow-xl rounded-lg">
        <div className="flex flex-col">
          <div className="text-center mb-8">
            <div className="text-2xl text-[#1c7cb4] font-semibold mb-2">¡Seleccione una nueva contraseña!</div>
            <div className={`text-sm text-gray-400 transition-all ${error ? error === "¡Todo listo!" ? "bg-[#0fff6322] rounded-sm border border-solid border-[#00ff0d0f] text-[#6e6f72]" : "bg-[#ff0f0f22] border border-solid border-[#ff00000f] text-[#6e6f72]" : ""}`}>
              {error ? error : (
                <p>
                  Recuerde seleccionar <Link to="https://es.wikipedia.org/wiki/Seguridad_de_la_contrase%C3%B1a" className="text-blue-500 underline" target="_blank">contraseñas seguras</Link> y fáciles de recordar, le recomendamos que utilice <Link to="https://es.wikipedia.org/wiki/Frase_de_contrase%C3%B1a" className="text-blue-500 underline" target="_blank">frases de contraseña</Link>.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handlerSubmit}>
              <div className="flex flex-col gap-6 mb-4 text-[#1c7cb4]">
                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="password" type={!showPassword ? "password" : "text"} placeholder="Elija una nueva contraseña" />
                  {showPassword ? <AiFillEyeInvisible onClick={() => { setShowPassword(!showPassword) }} className="text-[#f96611] cursor-pointer" /> : <AiFillEye onClick={() => { setShowPassword(!showPassword) }} className="text-[#f96611] cursor-pointer" />}
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="repassword" type={!showRePassword ? "password" : "text"} placeholder="Confirme su contraseña ingresándola nuevamente" />
                  {showRePassword ? <AiFillEyeInvisible onClick={() => { setShowRePassword(!showRePassword) }} className="text-[#f96611] cursor-pointer" /> : <AiFillEye onClick={() => { setShowRePassword(!showRePassword) }} className="text-[#f96611] cursor-pointer" />}
                </div>
              </div>

              <div className="flex items-center justify-center mb-2">
                <button className="flex-1 bg-[#f96611] text-xl rounded-md p-2">Cambiar la contraseña</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
