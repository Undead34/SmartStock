import { AiOutlineShoppingCart } from "react-icons/ai"
import { LuCalendarClock } from "react-icons/lu"
import { MdOutlineAssignmentInd } from "react-icons/md"
import { LiaBarsSolid } from "react-icons/lia"
import { AiOutlineShop } from "react-icons/ai"
import { FiUsers, FiSettings } from "react-icons/fi"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"

function SidebarItem({ text, icon, to }) {
  return (
    <Link to={to} className="flex w-full items-center justify-center gap-2 py-3 px-1 flex-col hover:bg-[#c3c7ce]" title={text}>
      <div className="text-4xl text-[#f96611]">{icon}</div>
      <div className="text-center text-xs">{text}</div>
    </Link>
  );
}

function Sidebar() {
  const [showAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("ID");

    if (id) {
      const response = window.SmartStock.invoke("smartstock:get:userinfo", { id });
      response.then((userInfo) => {
        if (userInfo.Role === "admin") {
          setAdmin(true)
        }
      })
    }
  })


  return (
    <div className="flex flex-col scrollbar h-full bg-[#f4f5f7] w-[5rem] select-none">
      <div className="flex items-center justify-center rounded-sm m-3 gap-2 p-1 flex-col hover:bg-[#c3c7ce]" title="">
        <div className="text-3xl text-[#f96611]"><LiaBarsSolid /></div>
      </div>
      <SidebarItem to="/app" text="Stock" icon={<AiOutlineShop />} />

      {
        showAdmin && (
          <>
            <SidebarItem to="buy" text="Comprar" icon={<AiOutlineShoppingCart />} />
            <SidebarItem to="assign" text="Asignar" icon={<MdOutlineAssignmentInd />} />
            <SidebarItem to="control" text="Control" icon={<LuCalendarClock />} />
            <SidebarItem to="customers" text="Clientes" icon={<FiUsers />} />
            <SidebarItem to="users" text="Admin" icon={<FiSettings />} />
          </>
        )
      }
    </div>
  )
}

export default Sidebar

{/* <SidebarItem to="/app" text="Home" icon={<AiOutlineFieldTime />} /> */ }
