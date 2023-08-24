import React, { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"
import Select from "react-select"
import { Table } from "./Tables"
import { toast } from "sonner"
import Header from "./Header"

export default function Assign() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

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

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:stock");
      const response2 = await window.SmartStock.invoke("smartstock:get:customers");

      setData(response);
      setData2(response2);
    } catch (error) {
      setData([]);
      setData2([]);
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Stock";
    getData();
  }, []);

  async function assignEquipment(value, item) {
    if (item && value) {
      item = { ...item };

      if (item.customer_name !== value) {
        item.customer_name = value === "none" ? null : value;
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

  const tagOptions = Array.from(new Set(data2.map((item) => item.customer_name)))
    .map((value) => ({
      value: value.toLowerCase(),
      label: value,
    }));

  tagOptions.push({ label: "Ninguno", value: "none" })

  const columns = [
    { key: "equipment_name", title: "Nombre del equipo", resize: true, type: "text", editable: true, },
    { key: "equipment_type", title: "Tipo de equipo", resize: true, type: "text", editable: true, },
    { key: "serial_number", title: "Número de serie", resize: true, type: "text", editable: true, },
    { key: "model", title: "Modelo", resize: true, type: "text", editable: true, },
    { key: "code", title: "Código", resize: true, type: "text", editable: true, },
  ];

  const customGrid = "--data-table-library_grid-template-columns: minmax(180px, 1fr) repeat(5, minmax(0, 1fr)); max-height: 406px;";

  const columnsCustom = [
    {
      children: (item) => {
        return (
          <div>
            <Select
              styles={styles.select}
              options={tagOptions}
              defaultValue={item.customer_name === null ? null : { label: item.customer_name, value: item.customer_name }}
              onChange={(value) => assignEquipment(value.value, item)}
              menuPortalTarget={document.body}
              placeholder="Asignar a..." />
          </div>
        )
      }, title: "Asignado", key: uuid(), resize: false,
    },
  ]

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Asignar" />
      {/* {showAdd && <FormAdd data={data} setShowAdd={setShowAdd} handleCreate={handleCreate} />} */}

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table columns={columns} values={data} customGrid={customGrid} columnsCustom={columnsCustom} />
        </div>
      </div>
    </div>
  )
}
