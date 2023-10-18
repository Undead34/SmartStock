import CreatableSelect from "react-select/creatable"
import React, { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"
import { toast } from "sonner"

import { filterData, generateProductCode } from "../utils"
import { Table } from "./Tables"
import Header from "./Header"

// Icons
import { VscAdd, VscTrash } from "react-icons/vsc"
import { BsSearch } from "react-icons/bs"
import { ImLoop2 } from "react-icons/im"

function FormAdd({ setShowAdd, handleCreate }) {
  const [custom, setCustom] = useState({ value: "", label: "" });
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    if (event.target.code.value === "" || !event.target.code.value) {
      setErrors({ ...errors, code: "* Campo requerido" });
    } else {
      const client = {
        id: uuid(),
        customer_name: event.target.customer_name.value.trim(),
        customer_email: event.target.customer_email.value.trim(),
        customer_country: event.target.customer_country.value,
        observation: event.target.observation.value.trim(),
        code: custom.value,
      }

      handleCreate(client)
      setShowAdd(false);
    }
  }

  function handleCreateTag(inputValue) {
    setCustom({ value: String(inputValue).toUpperCase(), label: String(inputValue).toUpperCase() })
  }

  const select = {
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
  }

  return (
    <div className="absolute flex items-center justify-center w-full h-full left-0 right-0 bg-black bg-opacity-30 z-50">
      <div className="bg-white min-w-[40%] flex shadow-md rounded-sm p-4">
        <form className="text-white flex flex-col flex-1 gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full items-center pb-2">
            <h1 className="text-2xl text-[#1c7cb4] font-semibold">Agregar cliente</h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#1c7cb4]">
            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input className="bg-transparent outline-none flex-1" name="customer_name" type="text" placeholder="Nombre del cliente" />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input className="bg-transparent outline-none flex-1" name="customer_email" type="text" placeholder="Contacto" />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input className="bg-transparent outline-none flex-1" name="customer_country" type="text" placeholder="País" />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <ImLoop2 onClick={() => { setCustom({ value: generateProductCode(), label: generateProductCode() }); }} className="cursor-pointer" />
              <CreatableSelect
                name="code"
                styles={select}
                onChange={(select) => setCustom(select)}
                placeholder="Código"
                onCreateOption={handleCreateTag}
                required
                value={custom}
                formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
              />

              {errors.code && <span onClick={() => { setErrors({ ...errors, code: "" }); }} className="text-red-500 whitespace-nowrap">{errors.code}</span>}
            </div>

            <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <textarea className="bg-transparent outline-none flex-1 max-h-16" name="observation" type="text" placeholder="Descripción" />
            </div>
          </div>

          <div className="flex gap-2 items-center mb-2 justify-end">
            <button onClick={(e) => {
              e.preventDefault();
              setShowAdd(false);
            }} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-4 py-2 text-white bg-red-500 hover:bg-red-600">
              Cancelar
            </button>
            <button className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md pl-3 pr-4 py-2 text-white bg-green-500 hover:bg-green-600">
              <VscAdd className="text-lg" />
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Customers = () => {
  const [selected, setSelected] = useState({ ids: [] })
  const [filteredData, setFilteredData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([])

  const isFiltered = Boolean(filteredData.length);

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:customers");
      setData(response);
    } catch (error) {
      setData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Clientes";
    getData();
  }, []);

  async function handleUpdate(value, id, key) {
    let item = data.filter((item) => (item.id === id))[0]

    if (item) {
      item = { ...item };

      if (item[key] !== value) {
        item[key] = value;
        const updated = await window.SmartStock.invoke("smartstock:update:customers", { item });
        if (updated) {
          toast.success("¡Guardado con exito!");
          getData();
        } else {
          toast.error("Error al actualizar el stock :(");
        }
      }
    }
  }

  async function handleCreate(item) {
    const updated = await window.SmartStock.invoke("smartstock:post:customers", { item });

    if (updated) {
      getData();
      toast.success("¡Cliente añadido con éxito!");
    } else {
      toast.error("Error al crear el cliente :(");
    }
  }

  function onSelectChange(action, state) {
    setSelected(state)
  }

  async function deleteItems() {
    if (selected.ids.length > 0) {
      const deleted = await window.SmartStock.invoke("smartstock:delete:customers", { ids: selected.ids });

      if (deleted) {
        getData();
        setSelected({ id: null, ids: [] });
        selected.ids.length === 1 ? toast.success("¡Elemento eliminado con éxito!") : toast.success("¡Elementos eliminados con éxito!");
      } else {
        selected.ids.length === 1 ? toast.success("Error al borrar el elemento :(") : toast.success("Error al borrar los elementos :(");
      }
    }
  }

  const columns = [
    { key: "customer_name", title: "Nombre del cliente", resize: true, type: "text", editable: true },
    { key: "customer_email", title: "Contacto", resize: true, type: "text", editable: true },
    { key: "customer_country", title: "País", resize: true, type: "text", editable: true },
    { key: "code", title: "Código", resize: true, type: "text", editable: true },
    { key: "observation", title: "Descripción", resize: false, type: "text", editable: true },
  ];

  const customGrid = "--data-table-library_grid-template-columns: auto minmax(180px, 1fr) repeat(4, minmax(0, 1fr)); max-height: 406px;";

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Clientes" />

      {showAdd && <FormAdd handleCreate={handleCreate} setShowAdd={setShowAdd} />}

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
          <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[400px] p-2 rounded-md border border-slate-400">
            <input onInput={(event) => setFilteredData(filterData(data, event.target.value.trim(), ["customer_name", "code"]))} className="flex-1 text-sm outline-none" placeholder="Búsqueda por nombre" />
            <BsSearch className="text-slate-400" />
          </div>

          <div className="flex ml-auto gap-2 justify-center items-center">
            <div onClick={() => setShowAdd(!showAdd)} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-600">
              <VscAdd className="text-lg" />
              Cliente
            </div>
            <div onClick={deleteItems} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-red-500 hover:bg-red-600">
              <VscTrash className="text-lg" />
              Borrar
            </div>
          </div>
        </div>

        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table columns={columns} values={isFiltered ? filteredData : data} state={selected} customGrid={customGrid} handleUpdate={handleUpdate} onSelectChange={onSelectChange} />
        </div>
      </div>
    </div>
  )
};

export default Customers;

