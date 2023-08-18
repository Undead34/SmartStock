import React, { useState } from "react";
import Header from "./Header";


const Orders = () => {
  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto" style={{ contain: "content" }}>
      <Header title="Notas de entrega" username="Gabriel Maizo" email="maizogabriel@gmail.com" />
    </div>
  )
};

export default Orders;
