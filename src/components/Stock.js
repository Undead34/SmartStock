import CreatableSelect from "react-select/creatable"
import React, { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"
import Select from "react-select"
import { toast } from "sonner"

import { filterData, generateProductCode, parseUserDate } from "../utils"
import { Table } from "../components/Tables"
import Header from "./Header"

// Icons
import { VscAdd, VscTrash } from "react-icons/vsc"
import { BsSearch } from "react-icons/bs"
import { LuFilter } from "react-icons/lu"
import { ImLoop2 } from "react-icons/im"

function FormAdd({ data, setShowAdd, handleCreate }) {
  const [custom, setCustom] = useState({ value: "", label: "" });
  const [errors, setErrors] = useState({});

  function handleDateChange(event) {
    const parsedDate = parseUserDate(event.target.value);
    if (!parsedDate) {
      setErrors({ ...errors, entry_date: "Fecha inválida" });
    } else {
      setErrors({ ...errors, entry_date: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (event.target.code.value === "" || !event.target.code.value) {
      setErrors({ ...errors, code: "* Campo requerido" });
    } else {
      const item = {
        id: uuid(),
        equipment_name: event.target.equipment_name.value.trim(),
        equipment_type: event.target.equipment_type.value.trim(),
        serial_number: event.target.serial_number.value.trim(),
        model: event.target.model.value.trim(),
        code: custom.value,
        entry_date: parseUserDate(event.target.entry_date.value),
        observation: event.target.observation.value.trim(),
        location: event.target.location.value.trim(),
      }

      handleCreate(item);
      setShowAdd(false);
    }
  }


  const tagOptions = Array.from(new Set(data.map(item => item.code)))
    .map(value => ({
      value: value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    }));

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

  function handleCreateTag(inputValue) {
    setCustom({ value: String(inputValue).toUpperCase(), label: String(inputValue).toUpperCase() })
  }

  return (
    <div className="absolute flex items-center justify-center w-full h-full left-0 right-0 bg-black bg-opacity-30 z-50">
      <div className="bg-white min-w-[40%] flex shadow-md rounded-sm p-4">
        <form className="text-white flex flex-col flex-1 gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full items-center pb-2">
            <h1 className="text-2xl text-[#1c7cb4] font-semibold">Agregar equipo</h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#1c7cb4]">
            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input required className="bg-transparent outline-none flex-1" name="equipment_name" type="text" placeholder="Nombre del equipo" />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input required className="bg-transparent outline-none flex-1" name="equipment_type" type="text" placeholder="Tipo de equipo" />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input required className="bg-transparent outline-none flex-1" name="serial_number" type="text" placeholder="Número de serie" />
              </div>

              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input required className="bg-transparent outline-none flex-1" name="model" type="text" placeholder="Modelo" />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <ImLoop2 onClick={() => { setCustom({ value: generateProductCode(), label: generateProductCode() }); }} className="cursor-pointer" />
                <CreatableSelect
                  name="code"
                  styles={select}
                  options={tagOptions}
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
                <input
                  required
                  className="bg-transparent outline-none flex-1"
                  name="entry_date"
                  type="date"
                  placeholder="Fecha de entrada"
                  onBlur={handleDateChange}
                />
                {errors.entry_date && <span className="text-red-500 whitespace-nowrap">{errors.entry_date}</span>}
              </div>
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input required className="bg-transparent outline-none flex-1" name="location" type="text" placeholder="Ubicación" />
            </div>

            <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <textarea required className="bg-transparent outline-none flex-1 max-h-16" name="observation" type="text" placeholder="Observación" />
            </div>
          </div>

          <div className="flex gap-2 items-center mb-2 justify-end">
            <button onClick={() => setShowAdd(false)} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-4 py-2 text-white bg-red-500 hover:bg-red-600">
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

function Actions({ data, handleFilter, handleCreate, handleDelete }) {
  const styles = {
    select: {
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
  }

  const tagOptions = Array.from(new Set(data.map(item => item.equipment_type.toLowerCase())))
    .map(value => ({
      value: value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    }));

  return (
    <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
      <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[280px] p-2 rounded-md border border-slate-400">
        <input onInput={(event) => handleFilter(filterData(data, event.target.value.trim()))}
          className="flex-1 text-sm outline-none" placeholder="Búsqueda por nombre o código" />
        <BsSearch className="text-slate-400" />
      </div>

      <div className="relative min-w-[200px] flex h-auto font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-2 hover:bg-gray-50">
        <LuFilter />
        <Select
          className="text-sm w-full"
          styles={styles.select}
          options={tagOptions}
          onChange={(tags) => handleFilter(filterData(data, tags.map((tag) => tag.value.toLowerCase())))}
          isMulti
          placeholder="Filtrar por..." />
      </div>

      <div className="flex ml-auto gap-2 justify-center items-center">
        <div onClick={handleCreate} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-600">
          <VscAdd className="text-lg" />
          Producto
        </div>
        <div onClick={handleDelete} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-red-500 hover:bg-red-600">
          <VscTrash className="text-lg" />
          Borrar
        </div>
      </div>
    </div>
  )
}

function Stock() {
  const [selected, setSelected] = useState({ id: null, ids: [] });
  const [filteredData, setFilteredData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  let [data, setData] = useState([]);

  data = data.filter((item) => item.customer_name === null)

  const isFiltered = Boolean(filteredData.length);

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:stock");
      setData(response);
    } catch (error) {
      setData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Stock";
    getData();
  }, []);


  function onSelectChange(action, state) {
    setSelected(state);
  }

  async function handleCreate(item) {
    const updated = await window.SmartStock.invoke("smartstock:post:stock", { item });

    if (updated) {
      getData();
      toast.success("¡Añadido con éxito al stock!");
    } else {
      toast.error("Error al agregar al stock :(");
    }
  }

  async function handleUpdate(value, id, key) {
    let item = data.filter((item) => (item.id === id))[0]

    if (item) {
      item = { ...item };

      if (item[key] !== value) {
        item[key] = value;
        const updated = await window.SmartStock.invoke("smartstock:update:stock", { item });
        if (updated) {
          toast.success("¡Guardado con exito!");
          getData();
        } else {
          toast.error("Error al actualizar el stock :(");
        }
      }
    }
  }

  async function handleDelete() {
    if (selected.ids.length > 0) {
      const deleted = await window.SmartStock.invoke("smartstock:delete:stock", { ids: selected.ids });

      if (deleted) {
        getData();
        setSelected({ id: null, ids: [] });
        selected.ids.length === 1 ? toast.success("¡Elemento eliminado con éxito!") : toast.success("¡Elementos eliminados con éxito!");
      } else {
        selected.ids.length === 1 ? toast.success("Error al borrar el elemento :(") : toast.success("Error al borrar los elementos :(");
      }
    }
  }

  function handleFilter(filters) {
    setFilteredData(filters);
  }

  const columns = [
    { key: "equipment_name", title: "Nombre del equipo", resize: true, type: "text", editable: true, },
    { key: "equipment_type", title: "Tipo de equipo", resize: true, type: "text", editable: true, },
    { key: "serial_number", title: "Número de serie", resize: true, type: "text", editable: true, },
    { key: "model", title: "Modelo", resize: true, type: "text", editable: true, },
    { key: "entry_date", title: "Fecha de entrada", resize: true, type: "date", editable: true, },
    { key: "code", title: "Código", resize: true, type: "text", editable: true, },
    { key: "observation", title: "Descripción", resize: false, type: "text", editable: true, },
  ];

  const customGrid = "--data-table-library_grid-template-columns: auto minmax(180px, 1fr) repeat(6, minmax(0, 1fr)); max-height: 406px;";

  console.log();

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Stock" />
      <div className="flex flex-col gap-4 px-10 mb-10">
        <Actions data={data} handleFilter={handleFilter} handleCreate={() => setShowAdd(!showAdd)} handleDelete={handleDelete} />
      </div>

      {showAdd && <FormAdd data={data} setShowAdd={setShowAdd} handleCreate={handleCreate} />}

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table columns={columns} values={isFiltered ? filteredData : data} customGrid={customGrid} handleUpdate={handleUpdate} state={selected} onSelectChange={onSelectChange} />
        </div>
      </div>
    </div>
  )
}

export default Stock;
