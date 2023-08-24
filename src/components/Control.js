import CreatableSelect from "react-select/creatable"
import React, { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"
import { toast } from "sonner"

import { parseUserDate, generateProductCode } from "../utils"
import { Table } from "./Tables"
import Header from "./Header"

import { GoVerified } from "react-icons/go"
import { VscAdd } from "react-icons/vsc"
import { ImLoop2 } from "react-icons/im"


function FormAdd({ item, setShowAdd, handleAprobe }) {
  const [custom, setCustom] = useState({ value: "", label: "" });
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

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
    getData();
  }, []);

  function handleDateChange(event) {
    const parsedDate = parseUserDate(event.target.value);
    if (!parsedDate) {
      setErrors({ ...errors, entry_date: "Fecha inválida" });
    } else {
      setErrors({ ...errors, entry_date: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (event.target.code.value === "" || !event.target.code.value) {
      setErrors({ ...errors, code: "* Campo requerido" });
    } else {
      const equip = {
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

      handleAprobe(equip, item)

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

  let defaultDate = parseUserDate(item.arrival_date) || new Date();
  defaultDate = defaultDate.toLocaleDateString("es-VE", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split('/')
    .reverse()
    .join('-')

  return (
    <div className="absolute flex items-center justify-center w-full h-full left-0 right-0 bg-black bg-opacity-30 z-50">
      <div className="bg-white min-w-[40%] flex shadow-md rounded-sm p-4">
        <form className="text-white flex flex-col flex-1 gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full items-center pb-2">
            <h1 className="text-2xl text-[#1c7cb4] font-semibold">Aprobar el equipo</h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#1c7cb4]">
            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input defaultValue={item.equipment_name} required className="bg-transparent outline-none flex-1" name="equipment_name" type="text" placeholder="Nombre del equipo" />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input required className="bg-transparent outline-none flex-1" name="equipment_type" type="text" placeholder="Tipo de equipo" />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input required className="bg-transparent outline-none flex-1" name="serial_number" type="text" placeholder="Número de serie" />
              </div>

              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input defaultValue={item.model} required className="bg-transparent outline-none flex-1" name="model" type="text" placeholder="Modelo" />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <ImLoop2 onClick={() => { setCustom({ value: generateProductCode(), label: generateProductCode() }); }} className="cursor-pointer" />
                <CreatableSelect
                  name="code"
                  styles={select}
                  options={tagOptions}
                  onChange={(select) => {
                    setCustom(select)
                  }}
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
                  defaultValue={defaultDate}
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
              <textarea defaultValue={item.observation} required className="bg-transparent outline-none flex-1 max-h-16" name="observation" type="text" placeholder="Observación" />
            </div>
          </div>

          <div className="flex gap-2 items-center mb-2 justify-end">
            <button onClick={() => setShowAdd(false)} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-4 py-2 text-white bg-red-500 hover:bg-red-600">
              Cancelar
            </button>
            <button className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md pl-3 pr-4 py-2 text-white bg-green-500 hover:bg-green-600">
              <VscAdd className="text-lg" />
              Aprobar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ApprovePurchases({ data, getData2, setShowAdd }) {
  useEffect(() => {
    document.title = "SmartStock - Control y seguimiento";
    getData2();
  }, []);

  function approve(item) {
    setShowAdd(item)
  }

  const columns = [
    { key: "customer_name", title: "Nombre del proveedor", resize: true, type: "text", editable: false, },
    { key: "equipment_name", title: "Nombre del equipo", resize: true, type: "text", editable: false, },
    { key: "model", title: "Modelo", resize: true, type: "text", editable: false, },
    { key: "amount", title: "Cantidad", resize: true, type: "number", editable: false, },
    { key: "entry_date", title: "Fecha de compra", resize: true, type: "date", editable: false, },
    { key: "arrival_date", title: "Fecha de llegada", resize: true, type: "date", editable: false, },
    { key: "status", title: "Estado", resize: true, type: "text", editable: false, },
    { key: "observation", title: "Observación", resize: true, type: "text", editable: false, },
  ];

  const customGrid = "--data-table-library_grid-template-columns: repeat(3, minmax(0, 1fr)) repeat(1, minmax(0, min-content)) repeat(4, minmax(0, 1fr)) auto; max-height: 406px;";

  const columnsCustom = [
    {
      children: (item) => {
        return (
          <>
            <div className="w-full flex justify-center items-center">
              <button onClick={() => { approve(item) }} className="flex items-center justify-center bg-green-500 px-2 py-1 text-white text-2xl text-center rounded-sm hover:bg-green-600">
                <GoVerified />
              </button>
            </div>
          </>
        )
      }, title: "Aprobar", key: uuid(), resize: false,
    },
  ]

  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="z-40 flex w-full pt-10 items-center">
        <h1 className="text-3xl text-[#1c7cb4] font-semibold">Aprobar compras</h1>
      </div>
      <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
        <Table columns={columns} values={data} customGrid={customGrid} columnsCustom={columnsCustom} />
      </div>
    </div>
  )
}

const Control = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:summary:equipment");
      setData(response.map((item) => {
        item.sold = String(item.sold)
        item.stock = String(item.stock)
        return item
      }));
    } catch (error) {
      setData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Control y seguimiento";
    getData();
  }, []);

  async function handleAprobe(equip, item) {
    const updated = await window.SmartStock.invoke("smartstock:post:stock", { item: equip });

    if (updated) {
      toast.success("¡Añadido con éxito al stock!");
      await window.SmartStock.invoke("smartstock:delete:buys", { ids: [item.id] });
      getData();
      getData2();
    } else {
      toast.error("Error al agregar al stock :(");
    }
  }

  const controlColumns = [
    { key: "equipment_type", title: "Tipo de equipo", resize: true, type: "text" },
    { key: "stock", title: "Cantidad", resize: true, type: "number" },
    { key: "sold", title: "Asignado", resize: true, type: "number" },
    { key: "observation", title: "Observación", resize: false, type: "text" },
  ];



  const [data2, setData2] = useState([]);

  async function getData2() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:buys");
      setData2(response.filter((item) => item.status === "En Stock"));
    } catch (error) {
      setData2([]);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto pb-10" style={{ contain: "content" }}>
      <Header title="Control y seguimiento" username="Gabriel Maizo" email="maizogabriel@gmail.com" />

      {showAdd && <FormAdd getData2={getData2} item={showAdd} handleAprobe={handleAprobe} setShowAdd={(value) => {
        setShowAdd(value);
      }} />}

      <div className="flex flex-col gap-4 px-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table columns={controlColumns} values={data} />
        </div>
      </div>

      <ApprovePurchases getData2={getData2} data={data2} setShowAdd={setShowAdd} />
    </div>
  )
};

export default Control;
