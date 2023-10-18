import React, { useState, useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { v4 as uuid } from "uuid";
import Select from "react-select";
import { Table } from "./Tables";
import { toast } from "sonner";
import Header from "./Header";
import { parseUserDate, dateToString } from "../utils";
import CreatableSelect from "react-select/creatable";

import { LuFilter } from "react-icons/lu";

function EmailInput({ item }) {
  const [user, setUser] = useState({ FullName: "", Email: "" });

  useEffect(() => {
    const response = window.SmartStock.invoke("smartstock:get:userinfo", {
      id: localStorage.getItem("ID"),
    });
    response.then((data) => {
      setUser(data);
    });
  }, []);

  function handleEmailSubmit(event) {
    event.preventDefault();
    const emails = event.target.email.value
      .split(",")
      .map((email) => email.trim());

    if (emails.length === 0 || !emails) {
      toast.error("Escriba una lista de correo válida");
    } else if (!item.customer_name) {
      toast.error("Por favor, asigne primero el equipo a un cliente");
    } else {
      const content = `
      Un placer saludarle, el presente es para la siguiente notificación:<br/><br/>

      Tenemos a nuestra disponibilidad la entrega de unos equipos.<br/>
      Permanecemos atentos a los días y horarios disponibles y persona de contacto para el envío de nota de entrega.<br/><br/>
      
      Si es necesario algún requerimiento para ingresar a sus instalaciones, por favor háganoslo saber al siguiente correo:<br/>
      ${user.FullName} &lt;${user.Email}&gt;<br/><br/>
      
      Gracias de antemano.
      `;

      const promise = window.SmartStock.invoke("smartstock:send:email", {
        content: content,
        email: emails,
        subject: "Actualización sobre la asignación del equipo",
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
        placeholder="Introduzca los correos electrónicos"
        title="Introduzca los correos electrónicos separados por comas ','"
        required
      />
      <button className="w-10 py-2 px-2 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white">
        <HiOutlineMail className="text-xl" />
      </button>
    </form>
  );
}

function filterData(data, filter) {
  const result = data.filter((item) => {
    if (item.customer_name) {
      const lowercaseCustomerName = item.customer_name.toLowerCase();
      return filter.map((e) => e.toLowerCase()).includes(lowercaseCustomerName);
    }

    return false;
  });

  return result;
}

function filterData2(data, filter) {
  const result = data.filter((item) => {
    const posibleDate = parseUserDate(item.assign_date);

    if (posibleDate) {
      const dateStr = dateToString(posibleDate);
      return filter.includes(dateStr);
    }

    return false;
  });

  return result;
}

function Actions({ data, handleFilter }) {
  const [tags1, setTag1] = useState([]);
  const [tags2, setTag2] = useState([]);

  useEffect(() => {
    async function filter() {
      const filterTags1 = tags1.map((tag) => tag.value.toLowerCase());
      const filterTags2 = tags2.map((tag) => tag.value.toLowerCase());

      const data1 = filterData(data, filterTags1);

      const data2 = filterData2(
        filterTags1.length > 0 ? data1 : data,
        filterTags2
      );

      if (filterTags2.length === 0 && filterTags1.length > 0) {
        if (
          data1.length === 0 &&
          (filterTags1.length > 0 || filterTags2.length > 0)
        )
          toast.message("No se encontraron coincidencias");

        handleFilter(data1);
      } else {
        if (
          data2.length === 0 &&
          (filterTags1.length > 0 || filterTags2.length > 0)
        )
          toast.message("No se encontraron coincidencias");

        handleFilter(data2);
      }
    }

    filter();
  }, [tags1, tags2]);

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
    },
  };

  const array1 = Array.from(
    new Set(
      data
        .filter((e) => Boolean(e.customer_name))
        .map((item) => item.customer_name.toLowerCase())
    )
  );

  const array2 = Array.from(
    new Set(
      data
        .filter((e) => {
          return Boolean(parseUserDate(e.assign_date));
        })
        .map((item) => dateToString(item.assign_date))
    )
  );

  const tagOptions = array1.map((value) => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  const tagOptions2 = array2.map((value) => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  return (
    <div className="bg-white shadow-sm flex p-2 rounded-md gap-2 text-gray-700 z-20">
      <div className="relative min-w-[420px] flex h-auto font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-2 hover:bg-gray-50">
        <LuFilter />
        <Select
          className="text-sm w-full"
          styles={styles.select}
          onChange={(tags) => setTag1(tags)}
          options={tagOptions}
          isMulti
          placeholder="Filtrar por..."
          noOptionsMessage={() => {
            return <>No hay clientes asignados</>;
          }}
        />
      </div>

      <div className="relative min-w-[420px] flex h-auto font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-2 hover:bg-gray-50">
        <LuFilter />
        <CreatableSelect
          className="text-sm w-full"
          styles={styles.select}
          onChange={(tags) => setTag2(tags)}
          options={tagOptions2}
          isMulti
          placeholder="Filtrar por..."
          noOptionsMessage={() => {
            return <>No hay fechas</>;
          }}
        />
      </div>
    </div>
  );
}

export default function Assign() {
  const [filteredData, setFilteredData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data, setData] = useState([]);

  const isFiltered = Boolean(filteredData.length);

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
    },
  };

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:stock");
      const response2 = await window.SmartStock.invoke(
        "smartstock:get:customers"
      );

      setData(response);
      setData2(response2);
    } catch (error) {
      setData([]);
      setData2([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Asignar";
    getData();
  }, []);

  async function assignEquipment(value, item) {
    if (item && value) {
      item = { ...item };

      if (item.customer_name !== value) {
        item.customer_name = value === "none" ? null : value;
        const updated = await window.SmartStock.invoke(
          "smartstock:update:stock",
          { item }
        );
        if (updated) {
          toast.success("¡Guardado con exito!");
          getData();
        } else {
          toast.error("Error al actualizar el stock :(");
        }
      }
    }
  }

  const tagOptions = Array.from(
    new Set(data2.map((item) => item.customer_name))
  ).map((value) => ({
    value: value,
    label: value,
  }));

  tagOptions.push({ label: "Ninguno", value: "none" });

  // Handler para actualizar un atributo de un elemento
  async function handleUpdate(value, id, key) {
    if (key === "assign_date" && value === "N/A") {
      value = null;
    }

    // Buscar el elemento correspondiente por su id
    const itemToUpdate = data.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedItem = { ...itemToUpdate, [key]: value };

      // Llamar a la API para actualizar el elemento
      const updated = await window.SmartStock.invoke(
        "smartstock:update:stock",
        { item: updatedItem }
      );

      if (updated) {
        toast.success("¡Guardado con éxito!");
      } else {
        toast.error("Error al actualizar el stock :(");
      }

      // Actualizar los datos después de la actualización
      getData();
    }
  }

  const columns = [
    {
      key: "equipment_name",
      title: "Nombre del equipo",
      resize: true,
      type: "text",
      editable: true,
    },
    {
      key: "serial_number",
      title: "Número de serie",
      resize: true,
      type: "text",
      editable: true,
    },
    {
      key: "model",
      title: "Modelo",
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
      key: "assign_date",
      title: "Fecha de asignación",
      resize: true,
      type: "date",
      editable: true,
    },
    {
      children: (item) => {
        return (
          <div>
            <Select
              className="!w-full !min-w-[100px]"
              styles={styles.select}
              options={tagOptions}
              defaultValue={
                item.customer_name === null
                  ? null
                  : { label: item.customer_name, value: item.customer_name }
              }
              onChange={(value) => assignEquipment(value.value, item)}
              menuPortalTarget={document.body}
              placeholder="Asignar a..."
            />
          </div>
        );
      },
      title: "Asignado",
      key: uuid(),
      resize: false,
      custom: true,
    },
    {
      key: "delivery_note",
      title: "Nota de entrega",
      resize: false,
      type: "text",
      editable: true,
      textarea: true,
    },
    {
      children: (item) => <EmailInput item={item} />,
      title: "Notificar a",
      key: "notify",
      resize: false,
      custom: true,
    },
  ];

  const customGrid =
    "--data-table-library_grid-template-columns: repeat(5, minmax(0, 1fr)) minmax(0, min-content) repeat(1, minmax(0, 1fr)) minmax(240px, 1fr); max-height: 406px;";

  function handleFilter(filters) {
    setFilteredData(filters);
  }

  return (
    <div
      className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto"
      style={{ contain: "content" }}
    >
      <Header title="Asignar" />

      <div className="flex flex-col gap-4 px-10 mb-10">
        <Actions data={data} handleFilter={handleFilter} />
      </div>

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table
            columns={columns}
            values={isFiltered ? filteredData : data}
            customGrid={customGrid}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
