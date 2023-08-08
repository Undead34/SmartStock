import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"

import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai"
import { AiOutlineUser, AiOutlineShop } from "react-icons/ai"

function SidebarItem({ text, icon, to }) {
  return (
    <Link to={to} className="text-[#1c7cb4] text-lg justify-center items-center hover:bg-[#c3c7ce] rounded-sm p-2">
      <div className="flex gap-2 items-center">
        <div className="sidebar-item-icon text-xl">{icon}</div>
        <div className="sidebar-item-text">{text}</div>
      </div>
    </Link>
  );
}

function Main() {
  return (
    <div className="flex flex-col p-10">
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/stock" element={<>Stock</>} />
        <Route path="/orders" element={<>Orders</>} />
        <Route path="/customers" element={<>Customers</>} />
        <Route path="/catalog" element={<>Catalog</>} />
        <Route path="/control" element={<>Control</>} />
      </Routes>
    </div>
  )
}

function Sidebar() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-60 h-full bg-[#f2f6ff] shadow-sm">
      <div className="flex justify-center items-center h-10 border-b mx-2 border-gray-300">
        <Link to="/app" className="outline-none text-2xl font-bold title-gradient select-none">
          SmartStock
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2">
        <SidebarItem to="stock" text="Stock" icon={<AiOutlineShop />} />
        <SidebarItem to="orders" text="Pedidos" icon={<AiOutlineCheckCircle />} />
        <SidebarItem to="customers" text="Clientes" icon={<AiOutlineUser />} />
        <SidebarItem to="catalog" text="Catálogo Online" icon={<AiOutlineCheckCircle />} />
        <SidebarItem to="control" text="Control y seguimiento" icon={<AiOutlineFieldTime />} />
      </div>
      <div>
        <button onClick={() => {
          localStorage.removeItem("TOKEN")
          navigate("/")
        }}>Cerrar sesión</button>
      </div>
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
  }
  else {
    return navigate("/")
  }
}
