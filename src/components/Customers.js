import React, { useState } from "react";
import { CustomersTable } from "./Tables";
import { customers } from "./data";
import { toast } from "sonner";
import Header from "./Header";

// Icons
import { BsSearch } from "react-icons/bs"
import { VscAdd, VscTrash } from "react-icons/vsc"

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(customers)
  const [selected, setSelected] = useState({ ids: [] })


  function handleUpdate(value, id, key) {
    const item = data.filter((item) => (item.id === id))[0]
    const intex = data.findIndex((item) => (item.id === id))
    if (item) {
      item[key] = value
    }
    let temp = [...data]
    temp[intex] = item
    setData(temp)
  }

  function onSelectChange(action, state) {
    setSelected(state)
  }

  function deleteItems() {
    setData(data.filter((item) => !selected.ids.includes(item.id)))
    selected.ids.length === 1 ? toast.success("Elemento eliminado con éxito") : toast.success("Elementos eliminados con éxito")
    setSelected({ ids: [] })
  }

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Clientes" username="Gabriel Maizo" email="maizogabriel@gmail.com" />

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
          <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[400px] p-2 rounded-md border border-slate-400">
            <input
              onInput={(event) => {
                const inputValue = event.target.value.trim().toLowerCase();

                if (inputValue === "") {
                  setData(customers);
                } else {
                  const filteredData = customers.filter(
                    (item) => item.customer_name.toLowerCase().includes(inputValue)
                  );
                  setData(filteredData);
                }
              }}
              className="flex-1 text-sm outline-none" placeholder="Búsqueda por nombre" />
            <BsSearch className="text-slate-400" />
          </div>

          <div className="flex ml-auto gap-2 justify-center items-center">
            <div className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-600">
              <VscAdd className="text-lg" />
              Cliente
            </div>
            <div onClick={() => {
              if (selected.ids.length > 0) {
                deleteItems()
              }
            }} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-red-500 hover:bg-red-600">
              <VscTrash className="text-lg" />
              Borrar
            </div>
          </div>
        </div>


        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <CustomersTable onSelectChange={onSelectChange} state={selected} handleUpdate={handleUpdate} nodes={data} />
        </div>
      </div>
    </div>
  )
};

export default Customers;

