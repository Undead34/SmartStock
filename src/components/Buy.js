import React, { useState, useEffect } from "react"
import { Table } from "./Tables"
import { toast } from "sonner"
import Header from "./Header"
import moment from "moment"
import { ImLoop2 } from "react-icons/im"
import { v4 as uuid } from "uuid"
import CreatableSelect from "react-select/creatable"
import { filterData } from "../utils"

// Icons
import { VscAdd, VscTrash } from "react-icons/vsc"
import { BsSearch } from "react-icons/bs"

function FormAdd({ setShowAdd, handleBuy }) {
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

  function parseUserDate(input) {
    const formats = ["DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
    let parsedDate = null;

    for (const format of formats) {
      const date = moment(input, format, true);
      if (date.isValid()) {
        parsedDate = date.toDate();
        break;
      }
    }
    return parsedDate;
  }


  function handleSubmit(event) {
    event.preventDefault();

    if (event.target.code.value === "" || !event.target.code.value) {
      setErrors({ ...errors, code: "* Campo requerido" });
    } else {
      const equip = {
        id: uuid(),
        supplier_name: event.target.supplier_name.value.trim(),
        equipment_name: event.target.equipment_name.value.trim(),
        // stock: event.target.stock.value.trim(),
        entry_date: parseUserDate(event.target.entry_date.value),
        arrival_date: event.target.arrival_date.value.trim(),
        code: custom.value,
        status: event.target.status.value.trim(),
        observation: event.target.observation.value.trim(),
      }

      handleBuy(equip)
      setShowAdd(false);
    }
  }

  function handleDateChangeEntryDate(event) {
    const parsedDate = parseUserDate(event.target.value);
    if (!parsedDate) {
      setErrors({ ...errors, entry_date: "Fecha inválida" });
    } else {
      setErrors({ ...errors, entry_date: "" });
    }
  }

  function handleDateChangeEntryDate(event) {
    const parsedDate = parseUserDate(event.target.value);
    if (!parsedDate) {
      setErrors({ ...errors, entry_date: "Fecha inválida" });
    } else {
      setErrors({ ...errors, entry_date: "" });
    }
  }

  function generateProductCode() {
    return uuid().split("-").join("").slice(0, 8).toUpperCase();
  }

  function handleCreateTag(inputValue) {
    setCustom({ value: String(inputValue).toUpperCase(), label: String(inputValue).toUpperCase() })
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

  return (
    <div className="absolute flex items-center justify-center w-full h-full left-0 right-0 bg-black bg-opacity-30 z-50">
      <div className="bg-white min-w-[40%] flex shadow-md rounded-sm p-4">
        <form className="text-white flex flex-col flex-1 gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full items-center pb-2">
            <h1 className="text-2xl text-[#1c7cb4] font-semibold">Agregar compra</h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#1c7cb4]">
            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input className="bg-transparent outline-none flex-1" name="supplier_name" type="text" placeholder="Nombre del proveedor" />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input className="bg-transparent outline-none flex-1" name="equipment_name" type="text" placeholder="Nombre del equipo" />
            </div>


            <div className="flex gap-2">
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input
                  required
                  className="bg-transparent outline-none flex-1"
                  name="entry_date"
                  type="date"
                  placeholder="Fecha de compra"
                  onBlur={handleDateChangeEntryDate}
                />
                {errors.entry_date && <span className="text-red-500 whitespace-nowrap">{errors.entry_date}</span>}
              </div>

              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input
                  required
                  className="bg-transparent outline-none flex-1"
                  name="arrival_date"
                  type="date"
                  placeholder="Fecha de llegada"
                  onBlur={handleDateChangeEntryDate}
                />
                {errors.arrival_date && <span className="text-red-500 whitespace-nowrap">{errors.arrival_date}</span>}
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
                <input className="bg-transparent outline-none flex-1" name="status" type="text" placeholder="Estado" />
              </div>
            </div>

            <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <textarea className="bg-transparent outline-none flex-1 max-h-16" name="observation" type="text" placeholder="Observación" />
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

function Buy() {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState({ ids: [] })
  const [filteredData, setFilteredData] = useState([]);
  const isFiltered = Boolean(filteredData.length);

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:buys");
      setData(response);
    } catch (error) {
      setData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Comprar";
    getData();
  }, []);

  async function handleUpdate(value, id, key) {
    let item = data.filter((item) => (item.id === id))[0]

    if (item) {
      item = { ...item };

      if (item[key] !== value) {
        item[key] = value;
        const updated = await window.SmartStock.invoke("smartstock:update:buys", { item });
        if (updated) {
          toast.success("¡Guardado con exito!");
        } else {
          toast.error("Error al actualizar el stock :(");
        }
        
        getData();
      }
    }
  }

  const customGrid = "--data-table-library_grid-template-columns: auto repeat(7, minmax(0, 1fr)); max-height: 406px;";

  const columns = [
    { key: "supplier_name", title: "Nombre del proveedor", resize: true, type: "text", editable: true, },
    { key: "equipment_name", title: "Nombre del equipo", resize: true, type: "text", editable: true, },
    { key: "code", title: "Código", resize: true, type: "text", editable: true, },
    { key: "entry_date", title: "Fecha de compra", resize: true, type: "date", editable: true, },
    { key: "arrival_date", title: "Fecha de llegada", resize: true, type: "date", editable: true, },
    { key: "observation", title: "Observación", resize: false, type: "text", editable: true, },
  ];

  async function handleBuy(equip) {
    const updated = await window.SmartStock.invoke("smartstock:post:buys", { item: equip });

    if (updated) {
      toast.success("¡Añadido con éxito a las compras!");
    } else {
      toast.error("Error al agregar al stock :(");
    }

    getData();
  }

  function onSelectChange(action, state) {
    setSelected(state)
  }

  async function deleteItems() {
    if (selected.ids.length > 0) {
      const deleted = await window.SmartStock.invoke("smartstock:delete:buys", { ids: selected.ids });

      if (deleted) {
        getData();
        setSelected({ id: null, ids: [] });
        selected.ids.length === 1 ? toast.success("¡Elemento eliminado con éxito!") : toast.success("¡Elementos eliminados con éxito!");
      } else {
        selected.ids.length === 1 ? toast.success("Error al borrar el elemento :(") : toast.success("Error al borrar los elementos :(");
      }
    }
  }

  const styles = {
    select: {
      container: () => ({
        display: "flex",
        position: "relative",
        flex: "1",
        width: "100%",
      }),
      control: () => ({
        display: "flex",
        flex: "1",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      }),
    }
  }

  const columnsCustom = [
    {
      children: (item) => {
        return (
          <div>
            <CreatableSelect
              styles={styles.select}
              options={[{ label: "En Stock", value: "En Stock" }]}
              defaultValue={{ label: item.status, value: item.status }}
              onChange={(e) => handleUpdate(e.value, item.id, "status")}
              menuPortalTarget={document.body}
              placeholder="estado"
            />
          </div>
        )
      }, title: "Estado", key: "status", resize: false,
    },
  ]

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto pb-10" style={{ contain: "content" }}>
      <Header title="Compras" username="Gabriel Maizo" email="maizogabriel@gmail.com" />

      {showAdd && <FormAdd handleBuy={handleBuy} setShowAdd={setShowAdd} />}

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
          <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[400px] p-2 rounded-md border border-slate-400">
            <input onInput={(event) => setFilteredData(filterData(data, event.target.value.trim(), ["equipment_name"]))} className="flex-1 text-sm outline-none" placeholder="Búsqueda por nombre de equipo" />
            <BsSearch className="text-slate-400" />
          </div>

          <div className="flex ml-auto gap-2 justify-center items-center">
            <div onClick={() => { setShowAdd(!showAdd) }} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-600">
              <VscAdd className="text-lg" />
              Compra
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
      </div>

      <div className="flex flex-col gap-4 px-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table customGrid={customGrid} columns={columns} state={selected} values={isFiltered ? filteredData : data} onSelectChange={onSelectChange} handleUpdate={handleUpdate} columnsCustom={columnsCustom} />
        </div>
      </div>
    </div>
  )
}

export default Buy;


  // const clientsOptions = [
  //   { value: "microsoft", label: "Microsoft" },
  //   { value: "riotgames", label: "Riot Games" },
  //   { value: "appleinc.", label: "Apple Inc." },
  //   { value: "amazon", label: "Amazon" },
  //   { value: "google", label: "Google" },
  //   { value: "samsung", label: "Samsung" },
  //   { value: "facebook", label: "Facebook" },Ñ
  //   { value: "toyota", label: "Toyota" },
  //   { value: "alibabagroup", label: "Alibaba Group" },
  //   { value: "netflix", label: "Netflix" },
  // ]

  // <Select className="bg-transparent outline-none flex-1" options={clientsOptions} placeholder="Nombre del proveedor" />

    // function handleUpdate(value, id, key) {
  //   const item = buyData.filter((item) => (item.id === id))[0];
  //   const intex = buyData.findIndex((item) => (item.id === id));
  //   if (item) {
  //     item[key] = value
  //   }
  //   let temp = [...buyData];
  //   temp[intex] = item;
  //   setBuyData(temp);
  // }


//   function handleNumber(event) {
//     const setZero = Number(event.target.value) < 0 || isNaN(Number(event.target.value)) || !isFinite(Number(event.target.value))

//     if (setZero) {
//       event.target.value = 0;
//     }

//     event.target.value = Number.parseInt(event.target.value);
//   }
//   <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
//   <input onInput={handleNumber} className="bg-transparent outline-none flex-1" name="stock" type="number" placeholder="Cantidad" />
// </div>
