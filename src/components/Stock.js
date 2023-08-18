import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { info } from "../components/data"
import { StockTable } from "../components/Tables"
import Select from "react-select";
import { toast } from "sonner"

// Icons
import { BsSearch } from "react-icons/bs"
import { VscAdd, VscTrash } from "react-icons/vsc"
import { LuFilter } from "react-icons/lu"
import Header from "./Header";


function Stock() {
  const [selected, setSelected] = useState({ ids: [] })
  const [data, setData] = useState(info)
  const [filter, setFilter] = useState([])

  function deleteItems() {
    setData(data.filter((item) => !selected.ids.includes(item.id)))
    selected.ids.length === 1 ? toast.success("Elemento eliminado con éxito") : toast.success("Elementos eliminados con éxito")
    setSelected({ ids: [] })
  }

  useEffect(() => {
    const acelerator = (event) => {
      if (event.key === "Delete" && selected.ids.length > 0) {
        deleteItems()
      }
    }

    document.addEventListener("keyup", acelerator)

    return () => {
      document.removeEventListener("keyup", acelerator)
    }
  }, [selected])

  function onSelectChange(action, state) {
    setSelected(state)
  }

  const temp = []
  const tagOptions = info.map((item) => {

    if (!temp.includes(item.equipment_type.toLowerCase())) {
      temp.push(item.equipment_type.toLowerCase())
      return {
        value: item.equipment_type.toLowerCase(),
        label: item.equipment_type,
      }
    } else {
      return null
    }
  }).filter((item) => item !== null)


  const handleTagChange = (selectedTags) => {
    setFilter(selectedTags)

    if (selectedTags.length === 0) {
      setData(info);
    } else {
      const filteredData = info.filter((item) =>
        selectedTags.some((tag) =>
          item.equipment_type.toLowerCase() === tag.value.toLowerCase()
        )
      );
      setData(filteredData);
    }
  };

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

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Stock" username="Gabriel Maizo" email="maizogabriel@gmail.com" />
      <div className="flex flex-col gap-4 px-10 mb-10">

        <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
          <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[280px] p-2 rounded-md border border-slate-400">
            <input onInput={(event) => {
              const inputValue = event.target.value.trim().toLowerCase();
              setFilter([])
              if (inputValue === "") {
                setData(info);
              } else {
                const filteredData = info.filter(
                  (item) =>
                    item.code.toLowerCase().includes(inputValue) ||
                    item.equipment_name.toLowerCase().includes(inputValue)
                );
                setData(filteredData);
              }
            }} className="flex-1 text-sm outline-none" placeholder="Búsqueda por nombre o código" />
            <BsSearch className="text-slate-400" />
          </div>
          <div className="relative min-w-[200px] flex h-auto font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-2 hover:bg-gray-50">
            <LuFilter />
            <Select
              className="text-sm w-full"
              styles={{
                container: () => ({
                  display: "flex",
                  position: "relative",
                  flex: "1",
                  width: "100%"
                }),
                control: () => ({
                  display: "flex",
                  flex: "1",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                }),
              }}
              value={filter}
              isMulti
              options={tagOptions}
              onChange={handleTagChange}
              placeholder="Filtrar por..."
            />
          </div>

          <div className="flex ml-auto gap-2 justify-center items-center">
            <div className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-600">
              <VscAdd className="text-lg" />
              Producto
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
          <StockTable onSelectChange={onSelectChange} state={selected} nodes={data} handleUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  )
}

export default Stock
