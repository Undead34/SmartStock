import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"

import Sidebar from "../components/Sidebar"
import Stock from "../components/Stock"

function Main() {
  return (
    <div className="flex flex-col">
      <Routes>
        <Route path="/" element={<Stock />} />
        {/* <Route path="stock" element={<>Stock</>} /> */}
        <Route path="orders" element={<>Orders</>} />
        <Route path="customers" element={<>Customers</>} />
        <Route path="catalog" element={"Hola"} />
        <Route path="control" element={<>Control</>} />
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
    }
  }, [])

  if (logged) {
    return (
      <div className="w-full h-full main-app">
        <Sidebar />
        <Main />
      </div>
    )
  } else {
    return navigate("/")
  }
}
