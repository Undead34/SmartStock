import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

import Sidebar from "../components/Sidebar"
import Control from "../components/Control"
import Stock from "../components/Stock"
import Customers from "../components/Customers"
import Orders from "../components/Orders"

function Main() {
  return (
    <div className="flex flex-col h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="control" element={<Control />} />
      </Routes>
    </div>
  )
}

export default function Inventory() {
  const navigate = useNavigate()
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      setLogged(true)

      toast("¡Bienvenido de nuevo Gabriel Maizo!", {
        style: {
          color: "#f96611",
          border: "1px solid rgb(255 0 0 / 6%)",
          background: "white"
        },
      })
    } else {
      navigate("/")
    }
  }, [])

  if (logged) {
    return (
      <div className="w-full h-full main-app">
        <Sidebar className="bg-blue-400" />
        <Main />
      </div>
    )
  } else {
    return null;
  }
}
