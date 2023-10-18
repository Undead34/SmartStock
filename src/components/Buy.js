import React, { useState, useEffect } from "react";
import { MdAlarm } from "react-icons/md";

import CreatableSelect from "react-select/creatable";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

import { filterData } from "../utils";
import { Table } from "./Tables";
import Header from "./Header";

import { ImLoop2 } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";

import {
  generateProductCode,
  parseUserDate,
  calculateRemainingDays,
} from "../utils";

// Icons
import { VscAdd, VscTrash } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";

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

  function handleSubmit(event) {
    event.preventDefault();

    if (event.target.code.value === "" || !event.target.code.value) {
      setErrors({ ...errors, code: "* Campo requerido" });
    } else {
      const equip = {
        id: uuid(),
        supplier_name: event.target.supplier_name.value.trim(),
        equipment_name: event.target.equipment_name.value.trim(),
        entry_date: parseUserDate(event.target.entry_date.value),
        arrival_date: event.target.arrival_date.value.trim(),
        code: custom.value,
        status: event.target.status.value.trim(),
        observation: event.target.observation.value.trim(),
      };

      handleBuy(equip);
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

  function handleCreateTag(inputValue) {
    setCustom({
      value: String(inputValue).toUpperCase(),
      label: String(inputValue).toUpperCase(),
    });
  }

  const tagOptions = Array.from(new Set(data.map((item) => item.code))).map(
    (value) => ({
      value: value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })
  );

  const select = {
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
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-full left-0 right-0 bg-black bg-opacity-30 z-50">
      <div className="bg-white min-w-[40%] flex shadow-md rounded-sm p-4">
        <form
          className="text-white flex flex-col flex-1 gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-center pb-2">
            <h1 className="text-2xl text-[#1c7cb4] font-semibold">
              Agregar compra
            </h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#1c7cb4]">
            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input
                className="bg-transparent outline-none flex-1"
                name="supplier_name"
                type="text"
                placeholder="Nombre del proveedor"
              />
            </div>

            <div className="flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <input
                className="bg-transparent outline-none flex-1"
                name="equipment_name"
                type="text"
                placeholder="Nombre del equipo"
              />
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
                {errors.entry_date && (
                  <span className="text-red-500 whitespace-nowrap">
                    {errors.entry_date}
                  </span>
                )}
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
                {errors.arrival_date && (
                  <span className="text-red-500 whitespace-nowrap">
                    {errors.arrival_date}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <ImLoop2
                  onClick={() => {
                    setCustom({
                      value: generateProductCode(),
                      label: generateProductCode(),
                    });
                  }}
                  className="cursor-pointer"
                />
                <CreatableSelect
                  name="code"
                  styles={select}
                  options={tagOptions}
                  onChange={(select) => {
                    setCustom(select);
                  }}
                  placeholder="Código"
                  onCreateOption={handleCreateTag}
                  required
                  value={custom}
                  formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
                />

                {errors.code && (
                  <span
                    onClick={() => {
                      setErrors({ ...errors, code: "" });
                    }}
                    className="text-red-500 whitespace-nowrap"
                  >
                    {errors.code}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
                <input
                  className="bg-transparent outline-none flex-1"
                  name="status"
                  type="text"
                  placeholder="Estado"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-row-reverse h-10 gap-2 rounded-md p-4 bg-white justify-start items-center border border-[#f9661111]">
              <textarea
                className="bg-transparent outline-none flex-1 max-h-16"
                name="observation"
                type="text"
                placeholder="Observación"
              />
            </div>
          </div>

          <div className="flex gap-2 items-center mb-2 justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowAdd(false);
              }}
              className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-4 py-2 text-white bg-red-500 hover:bg-red-600"
            >
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

function EmailInput({ item }) {
  function handleEmailSubmit(event) {
    event.preventDefault();
    const emails = event.target.email.value
      .split(",")
      .map((email) => email.trim());

    if (emails.length === 0 || !emails) {
      toast.error("Escriba una lista de correo válida");
    } else {
      const content = `Este correo electrónico se ha enviado para informarle sobre el estado del equipo: <br/>
      ID: ${item.id} <br/>
      Nombre del proveedor: ${item.supplier_name} <br/>
      Nombre del equipo: ${item.equipment_name} <br/>
      Fecha de compra: ${item.entry_date.toLocaleDateString("es-VE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })} <br/>
      Fecha de llegada: ${item.arrival_date.toLocaleDateString("es-VE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })} <br/>
      Código de producto: ${item.code} <br/>
      Estado: ${item.status} <br/>
      Nota: ${item.observation} <br/>
      Días restantes hasta la entrega: ${item.remaining_days}`;

      const promise = window.SmartStock.invoke("smartstock:send:email", {
        content: content,
        email: emails,
        subject: "Informe del estado de la compra SmartStock",
      });

      toast.promise(promise, {
        loading: `Enviando correo a ${
          emails.join(", ").substring(0, 20) + "..."
        }...`,
        success: (response) => {
          if (response) {
            return `Correo enviado: ${
              emails.join(", ").substring(0, 20) + "..."
            }`;
          } else {
            return "Se ha producido un error al enviar el correo :(";
          }
        },
        error: "Se ha producido un error al enviar el correo :(",
        style: {
          color: "#f96611",
          border: "1px solid rgb(255 0 0 / 6%)",
          background: "white",
        },
      });
    }
  }

  return (
    <form
      onSubmit={handleEmailSubmit}
      className="flex border border-gray-300 rounded-x"
    >
      <input
        onFocus={(e) => {
          e.target.parentElement.classList.add("focus:ring");
          e.target.parentElement.classList.add("focus:border-blue-500");
        }}
        onBlur={(e) => {
          e.target.parentElement.classList.remove("focus:ring");
          e.target.parentElement.classList.remove("focus:border-blue-500");
        }}
        name="email"
        type="text"
        className="flex-1 py-2 min-w-0 px-2 outline-none"
        placeholder="Ingrese su correo"
        required
      />
      <button className="w-8 py-2 px-2 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white">
        <HiOutlineMail className="text-xl" />
      </button>
    </form>
  );
}

function Buy() {
  const [buysData, setBuysData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState({ ids: [] });
  const [filteredBuysData, setFilteredBuysData] = useState([]);
  const isFiltered = Boolean(filteredBuysData.length);

  const selectStyles = {
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
  };

  async function fetchBuysData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:buys");
      const updatedData = response.map((item) => ({
        ...item,
        remaining_days: calculateRemainingDays(item.arrival_date),
      }));
      setBuysData(updatedData);
    } catch (error) {
      setBuysData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Comprar";
    fetchBuysData();
  }, []);

  // Handler para actualizar un atributo de un elemento
  async function handleUpdate(value, id, key) {
    // Buscar el elemento correspondiente por su id
    const itemToUpdate = buysData.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedItem = { ...itemToUpdate, [key]: value };

      // Eliminar la propiedad 'remaining_days'
      delete updatedItem.remaining_days;

      // Llamar a la API para actualizar el elemento
      const updated = await window.SmartStock.invoke("smartstock:update:buys", {
        item: updatedItem,
      });

      if (updated) {
        toast.success("¡Guardado con éxito!");
      } else {
        toast.error("Error al actualizar el stock :(");
      }

      // Actualizar los datos después de la actualización
      fetchBuysData();
    }
  }

  // Manejar la acción de agregar una compra
  async function handleBuy(equip) {
    const updated = await window.SmartStock.invoke("smartstock:post:buys", {
      item: equip,
    });

    if (updated) {
      toast.success("¡Añadido con éxito a las compras!");
    } else {
      toast.error("Error al agregar al stock :(");
    }

    fetchBuysData();
  }

  // Manejar el cambio en la selección
  function onSelectChange(action, state) {
    setSelectedItems(state);
  }

  async function deleteItems() {
    if (selectedItems.ids.length > 0) {
      const deleted = await window.SmartStock.invoke("smartstock:delete:buys", {
        ids: selectedItems.ids,
      });

      if (deleted) {
        fetchBuysData();
        setSelectedItems({ id: null, ids: [] });
        selectedItems.ids.length === 1
          ? toast.success("¡Elemento eliminado con éxito!")
          : toast.success("¡Elementos eliminados con éxito!");
      } else {
        selectedItems.ids.length === 1
          ? toast.success("Error al borrar el elemento :(")
          : toast.success("Error al borrar los elementos :(");
      }
    }
  }

  const customGrid =
    "--data-table-library_grid-template-columns: auto minmax(0, 150px) repeat(7, minmax(0, 1fr)); max-height: 406px;";

  // Definir un array de objetos columna para la primera tabla
  const columns = [
    { key: "id", title: "ID", resize: true, type: "text", editable: false },
    {
      key: "supplier_name",
      title: "Nombre del proveedor",
      resize: true,
      type: "text",
      editable: true,
    },
    {
      key: "equipment_name",
      title: "Nombre del equipo",
      resize: true,
      type: "text",
      editable: true,
    },
    {
      key: "code",
      title: "Código",
      resize: true,
      type: "text",
      editable: true,
    },
    {
      key: "entry_date",
      title: "Fecha de compra",
      resize: true,
      type: "date",
      editable: true,
    },
    {
      key: "arrival_date",
      title: "Fecha de llegada",
      resize: true,
      type: "date",
      editable: true,
    },
    {
      key: "observation",
      title: "Observación",
      resize: false,
      type: "text",
      editable: true,
      textarea: true,
    },
    {
      children: (item) => (
        <div>
          <CreatableSelect
            styles={selectStyles}
            options={[{ label: "En Stock", value: "En Stock" }]}
            defaultValue={
              item.status === "" || !item.status
                ? undefined
                : { label: item.status, value: item.status }
            }
            onChange={(e) => handleUpdate(e.value, item.id, "status")}
            menuPortalTarget={document.body}
            placeholder="Estado..."
          />
        </div>
      ),
      title: "Estado",
      key: "status",
      resize: false,
      custom: true,
    },
  ];

  const customGrid2 =
    "--data-table-library_grid-template-columns: minmax(0, 150px) minmax(0, min-content) repeat(2, minmax(0, 1fr)) minmax(0, min-content) minmax(0, 1fr); max-height: 406px;";

  // Definir un array de objetos columna para la segunda tabla
  const columns2 = [
    { key: "id", title: "ID", resize: true, type: "text", editable: false },
    {
      key: "supplier_name",
      title: "Nombre del proveedor",
      resize: true,
      type: "text",
    },
    {
      key: "equipment_name",
      title: "Nombre del equipo",
      resize: true,
      type: "text",
    },
    { key: "code", title: "Código", resize: true, type: "text" },
    {
      key: "remaining_days",
      title: "Días de entrega restantes",
      resize: true,
      type: "text",
    },
    {
      children: (item) => <EmailInput item={item} />,
      title: "Notificar a",
      key: "notify",
      resize: false,
      custom: true,
    },
  ];

  return (
    <div
      className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto pb-10"
      style={{ contain: "content" }}
    >
      <Header title="Compras" />

      {showAddForm && (
        <FormAdd handleBuy={handleBuy} setShowAdd={setShowAddForm} />
      )}

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
          <div className="relative gap-2 justify-center items-center flex text-slate-400 min-w-[400px] p-2 rounded-md border border-slate-400">
            <input
              onInput={(event) =>
                setFilteredBuysData(
                  filterData(buysData, event.target.value.trim(), [
                    "equipment_name",
                  ])
                )
              }
              className="flex-1 text-sm outline-none"
              placeholder="Búsqueda por nombre de equipo"
            />
            <BsSearch className="text-slate-400" />
          </div>

          <div className="flex ml-auto gap-2 justify-center items-center">
            <div
              onClick={() => {
                setShowAddForm(!showAddForm);
              }}
              className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-green-500 hover:bg-green-600"
            >
              <VscAdd className="text-lg" />
              Compra
            </div>
            <div
              onClick={deleteItems}
              className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-red-500 hover:bg-red-600"
            >
              <VscTrash className="text-lg" />
              Borrar
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table
            customGrid={customGrid}
            columns={columns}
            state={selectedItems}
            values={isFiltered ? filteredBuysData : buysData}
            onSelectChange={onSelectChange}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-10">
        <div className="z-40 flex w-full pt-10 items-center">
          <h1 className="flex flex- justify-center items-center gap-1 text-3xl text-[#1c7cb4] font-semibold title-gradient">
            <MdAlarm className="title-gradient" />
            Alertas
          </h1>
        </div>
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table
            customGrid={customGrid2}
            columns={columns2}
            values={isFiltered ? filteredBuysData : buysData}
          />
        </div>
      </div>
    </div>
  );
}

export default Buy;
