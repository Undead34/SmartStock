import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

function Home() {
  const [useunMount, setunMount] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let id = setTimeout(() => {
      if (useunMount === "login") {
        navigate("/login")
      } else if (useunMount === "app") {
        navigate("/app")
      } else {
        setunMount(false)
      }
    }, 300)

    return () => {
      clearTimeout(id)
    }
  }, [useunMount])

  useEffect(() => {
    let id = setTimeout(async () => {
      const token = localStorage.getItem("TOKEN")

      if (token) {
        const valid = await window.SmartStock.invoke("smartstock:login:token", { token });
        if (valid) setunMount("app")
        else setunMount("login")
      } else {
        setunMount("login")
      }
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [])

  return (
    <div style={{ right: useunMount ? "100%" : "0", opacity: useunMount ? "0" : "1" }} className="flex h-full w-full flex-col gap-4 select-none transition-all absolute opacity-100 right-0">
      <div className="flex flex-1 justify-center items-center flex-col gap-4">
        <h1 className="text-6xl font-bold title-gradient">SmartStock</h1>
        <Loader />
      </div>
      <div className="flex justify-center items-center font-semibold">
        © 2023 Sinaí Rojas & Luis Salazar. Todos los derechos reservados.
      </div>
    </div>
  )
}

export default Home;