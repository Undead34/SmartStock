import { BsChevronDown, BsSearch } from "react-icons/bs"
import { VscAdd } from "react-icons/vsc"
import { LuFilter } from "react-icons/lu"
import React from "react"

function Header({ title, username, email }) {
  return (
    <div className="flex w-full pt-10 pb-5 px-10 items-center">
      <h1 className="text-3xl text-[#1c7cb4] font-semibold">{title}</h1>
      <div className="relative flex flex-col ml-auto rounded-md  p-2 text-gray-700">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs">{email}</p>
          </div>
          <div className="flex justify-center items-center cursor-pointer transition-all rotate-180 hover:-rotate-0">
            <BsChevronDown />
          </div>
        </div>
        <div className="hidden absolute top-14 w-full rounded-lg bg-slate-700">
          <div className="flex flex-col gap-1 text-sm justify-start items-start p-2 w-full text-white">
            <button className="text-white py-2 rounded-sm w-full hover:bg-slate-600">Restablecer contraseña</button>
            <button className="text-red-600 py-2 rounded-sm w-full hover:bg-slate-600">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stock() {
  return (
    <div className="flex flex-col bg-[#fbfbfb] h-full w-full">
      <Header title="Stock" username="Gabriel Maizo" email="maizogabriel@gmail.com" />
      <div className="px-10">

        <div className="bg-white shadow-sm w-full flex p-2 rounded-md gap-2 text-gray-700">
          <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[280px] p-2 rounded-md border border-slate-400">
            <input className="flex-1 outline-none" placeholder="Búsqueda por nombre o código" />
            <BsSearch className="text-slate-400" />
          </div>
          <div className="flex h-auto font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-2 hover:bg-gray-50">
            <LuFilter />
            Filtro
          </div>
          <div className="ml-auto flex h-auto font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 text-white bg-green-500 hover:bg-green-600">
            <VscAdd className="text-lg" />
            Productos
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Stock

{/* <button>Cerrar Sesión</button> */ }
