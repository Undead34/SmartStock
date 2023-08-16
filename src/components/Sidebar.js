import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai"
import { AiOutlineUser, AiOutlineShop } from "react-icons/ai"
import { LiaBarsSolid } from "react-icons/lia"
import { Link } from "react-router-dom";
import React from "react"

function SidebarItem({ text, icon, to }) {
  return (
    <Link to={to} className="flex w-full items-center justify-center gap-2 py-3 px-1 flex-col hover:bg-[#c3c7ce]" title={text}>
      <div className="text-4xl text-[#f96611]">{icon}</div>
      <div className="text-center text-xs">{text}</div>
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col scrollbar h-full bg-[#f4f5f7] w-[5rem] select-none">
      <div className="flex items-center justify-center rounded-sm m-3 gap-2 p-1 flex-col hover:bg-[#c3c7ce]" title="">
        <div className="text-3xl text-[#f96611]"><LiaBarsSolid /></div>
      </div>

      <SidebarItem to="/app" text="Stock" icon={<AiOutlineShop />} />
      <SidebarItem to="orders" text="Pedidos" icon={<AiOutlineCheckCircle />} />
      <SidebarItem to="customers" text="Clientes" icon={<AiOutlineUser />} />
      <SidebarItem to="catalog" text="Catálogo Online" icon={<AiOutlineCheckCircle />} />
    </div>
  )
}

export default Sidebar

{/* <SidebarItem to="/app" text="Home" icon={<AiOutlineFieldTime />} /> */ }
