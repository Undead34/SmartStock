import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AiFillEye } from "react-icons/ai"
import { MdEmail } from "react-icons/md"

export default function NewPassword() {
  const [error, setError] = useState(false)

  function handlerSubmit(event) {
    event.preventDefault()

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
                  <input className="bg-transparent outline-none flex-1" name="email" type="email" placeholder="Introduzca su dirección de correo electrónico" />
                  <MdEmail className="text-[#f96611]" />
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="password" type="password" placeholder="Por razones de seguridad, elija una contraseña" />
                  <AiFillEye className="text-[#f96611] cursor-pointer" />
                </div>

                <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                  <input className="bg-transparent outline-none flex-1" name="repassword" type="password" placeholder="Confirme su contraseña ingresándola nuevamente" />
                  <AiFillEye className="text-[#f96611] cursor-pointer" />
                </div>
              </div>

              <div className="flex items-center justify-center mb-2">
                <button className="flex-1 bg-[#f96611] text-xl rounded-md p-2">Registrarse</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
