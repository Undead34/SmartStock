import React, { useState } from "react";
import { ControlTable, TrackingTable } from "./Tables";
import { control, tracking } from "./data";
import Header from "./Header";

const Control = () => {
  const [controlData, setControlData] = useState(control)
  const [trackingData, setTrackingData] = useState(tracking)

  function handleUpdateControl(value, id, key) {
    const item = controlData.filter((item) => (item.id === id))[0]
    const intex = controlData.findIndex((item) => (item.id === id))
    if (item) {
      item[key] = value
    }
    let temp = [...controlData]
    temp[intex] = item
    setControlData(temp)
  }

  function handleUpdateTracking(value, id, key) {
    const item = trackingData.filter((item) => (item.id === id))[0]
    const intex = trackingData.findIndex((item) => (item.id === id))
    if (item) {
      item[key] = value
    }
    let temp = [...trackingData]
    temp[intex] = item
    setTrackingData(temp)
  }


  const columns = [
    { key: "customer_name", title: "Nombre del cliente", resize: true },
    { key: "order_code", title: "Código del pedido", resize: true },
    { key: "code", title: "Código del producto", resize: true },
    { key: "amount", title: "Cantidad", resize: true, type: "number" },
    { key: "entry_date", title: "Fecha de entrada", resize: true },
    { key: "departure_date", title: "Fecha de salida", resize: true },
    { key: "arrival_date", title: "Fecha de llegada", resize: true },
    { key: "status", title: "Estado", resize: true },
    { key: "observation", title: "Observación", resize: true },
  ];

  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Control y seguimiento" username="Gabriel Maizo" email="maizogabriel@gmail.com" />

      <div className="flex flex-col gap-4 px-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <ControlTable nodes={controlData} handleUpdate={handleUpdateControl} />
        </div>
      </div>

      {/* Tracking */}

      <div className="z-40 flex w-full pt-10 pb-5 px-10 items-center">
        <h1 className="text-3xl text-[#1c7cb4] font-semibold">En tránsito</h1>
      </div>

      <div className="flex flex-col gap-4 px-10 mb-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <TrackingTable columns={columns} values={trackingData} handleUpdate={handleUpdateTracking} />
        </div>
      </div>
    </div>
  )
};

export default Control;
