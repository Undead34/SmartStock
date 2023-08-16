import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AiFillMessage } from "react-icons/ai"
import { MdEmail } from "react-icons/md"

export default function Login() {
  const [sended, setSended] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const codeRef = useRef(null)

  useEffect(() => {
    const unsubscribe = window.SmartStock.receive("smartstock:recovery:user", (event, data) => {
      switch (data.CODE) {
        case "OK":
          setError("El correo ha sido enviado correctamente")
          break;
        case "NO_EXISTS":
          setError("Correo electrónico no válido")
          setSended(false)
          break;
        case "EMAIL_SEND_ERROR":
          setError("Se ha producido un error en el servidor al intentar enviar el correo")
          setSended(false)
          console.error(data.ERROR, data.CODE);
          break;
        default:
          setError("¡Se ha producido un error de servidor desconocido!")
          setSended(false)
          console.error(data.ERROR, data.CODE);
          break;
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (codeRef.current)
      codeRef.current.value = ""
  }, [sended])

  async function handlerSubmit(event) {
    event.preventDefault()

    if (sended) {
      const code = event.target.code.value.trim()
      const response = await window.SmartStock.invoke("smartstock:validate:code", { code, email });

      switch (response.CODE) {
        case "OK":
          navigate(`/new-password?id=${response.id}`)
          break;
        case "INVALID_CODE":
          setError("Código no válido")
          break;
        case "NO_EXISTS":
          setError("Correo electrónico no válido o el usuario no existe! 🙃")
          setSended(false)
          console.error(data.ERROR, data.CODE);
          break;
        default:
          setError("¡Se ha producido un error de servidor desconocido!")
          setSended(false)
          console.error(data.ERROR, data.CODE);
          break;
      }
    } else {
      const email = event.target.email.value.trim()

      if (email) {
        setEmail(email)
        window.SmartStock.send("smartstock:recovery:user", email)
        setError("El correo ha sido enviado correctamente")
        setSended(true)
      } else {
        setError("No deje el campo vacío")
      }
    }
  }

  function resend(event) {
    event.preventDefault()
    const input = document.createElement("input")
    input.setAttribute("type", "email")
    input.setAttribute("required", true)
    input.value = email.trim()

    if (input.checkValidity()) {
      window.SmartStock.send("smartstock:recovery:user", email)
      setError("El correo ha sido reenviado correctamente")
    } else {
      setError("El campo está vacío o no es una dirección de correo electrónico válida")
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#f2f6ff] text-white gap-2">
      <div className="p-10 flex flex-col bg-[#ffffff] w-[32rem] shadow-xl rounded-lg">
        <div className="flex flex-col">
          <div className="text-center mb-8">
            <div className="text-2xl text-[#1c7cb4] font-semibold mb-2">Restablecimiento de contraseña</div>

            <div className={`text-sm text-gray-400 transition-all ${error ? (error === "El correo ha sido reenviado correctamente" || error === "El correo ha sido enviado correctamente") ? "bg-[#0fff6322] rounded-sm border border-solid border-[#00ff0d0f] text-[#6e6f72]" : "bg-[#ff0f0f22] border border-solid border-[#ff00000f] text-[#6e6f72]" : ""}`}>
              {error ? error : "Olvidó su contraseña, ¿eh? No se preocupe, ingrese su email y lo solucionaremos"}
            </div>
          </div>

          <div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handlerSubmit}>
              <div className="flex flex-col gap-6 mb-4 text-[#1c7cb4]">
                {
                  !sended ? (
                    <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                      <input required className="bg-transparent outline-none flex-1" name="email" type="email" placeholder="Introduzca su email" />
                      <MdEmail className="text-[#f96611]" />
                    </div>
                  ) :
                    (
                      <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                        <input ref={codeRef} required className="bg-transparent outline-none flex-1" name="code" type="text" placeholder="Introduzca el código de verificación" />
                        <AiFillMessage className="text-[#f96611]" />
                      </div>
                    )
                }
              </div>

              {
                sended && (
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-gray-400">
                      ¿No has recibido el correo?  {" "}
                      <Link onClick={resend} href="#" className="text-[#1c7cb4] underline">volver a enviar</Link>
                    </span>
                  </div>
                )
              }

              <div className="flex items-center justify-center mb-2">
                <button className="flex-1 bg-[#f96611] text-xl rounded-md p-2">{sended ? "Restablecer contraseña" : "Enviar código"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-[#ffffff] w-[32rem] shadow-xl rounded-lg p-2 text-center">
        <span className="text-gray-400">
          ¿Listo? Regresar al  {" "}
          <Link to={"/login"} className="text-[#1c7cb4] underline">inicio de sesión</Link>
        </span>
      </div>
    </div>
  )
}
