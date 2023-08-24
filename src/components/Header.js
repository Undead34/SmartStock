import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsChevronDown } from "react-icons/bs"

export default function Header({ title }) {
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState({ FullName: "", Email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const response = window.SmartStock.invoke("smartstock:get:userinfo", { id: localStorage.getItem("ID") });
    response.then((data) => {
      setUser(data)
    });
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (!e.target.classList.contains("noexit")) {
        setDropdown(false)
      }
    }

    if (dropdown) {
      document.addEventListener("click", close)
    }

    return () => {
      document.removeEventListener("click", close)
    }
  }, [dropdown])

  return (
    <div className="z-40 flex w-full pt-10 pb-5 px-10 items-center">
      <h1 className="text-3xl text-[#1c7cb4] font-semibold">{title}</h1>
      <div className="relative flex flex-col ml-auto rounded-md  p-2 text-gray-700">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{user.FullName}</p>
            <p className="text-xs">{user.Email}</p>
          </div>
          <div onClick={() => setDropdown(!dropdown)} className={`flex noexit justify-center items-center cursor-pointer transition-all ${dropdown ? "-rotate-0" : "rotate-180"}`}>
            <BsChevronDown className="noexit" />
          </div>
        </div>
        <div className={`${dropdown ? "" : "hidden"} absolute top-14 w-full rounded-lg bg-slate-700 noexit`}>
          <div className="flex flex-col gap-1 text-sm justify-start items-start p-2 w-full text-white noexit">
            <button onClick={() => {
              localStorage.removeItem("TOKEN")
              navigate(`/new-password?id=${localStorage.getItem("ID")}`)
            }} className="text-white py-2 rounded-sm w-full hover:bg-slate-600 noexit">Restablecer contraseña</button>
            <button onClick={() => {
              localStorage.removeItem("TOKEN")
              localStorage.removeItem("ID")
              navigate("/")
            }} className="text-red-600 py-2 rounded-sm w-full hover:bg-slate-600 noexit">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  )
}
