import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import Customers from "../components/Customers";
import Sidebar from "../components/Sidebar";
import Control from "../components/Control";
import Assign from "../components/Assign";
import Stock from "../components/Stock";
import Users from "../components/Users";
import Buy from "../components/Buy";

function Main() {
  return (
    <div
      className="flex flex-col h-full w-full overflow-auto"
      style={{ contain: "content" }}
    >
      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="customers" element={<Customers />} />
        <Route path="control" element={<Control />} />
        <Route path="buy" element={<Buy />} />
        <Route path="assign" element={<Assign />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default function Inventory() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const id = localStorage.getItem("ID");

    if (token && id) {
      const response = window.SmartStock.invoke("smartstock:login:token", {
        token,
        id,
      });

      response.then((valid) => {
        if (valid) {
          const response = window.SmartStock.invoke("smartstock:get:userinfo", {
            id,
          });

          response.then((data) => {
            setLogged(true);

            toast(`¡Bienvenido/a de nuevo ${data.FullName}!`, {
              style: {
                color: "#f96611",
                border: "1px solid rgb(255 0 0 / 6%)",
                background: "white",
              },
            });
          });
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, []);

  if (logged) {
    return (
      <div className="w-full h-full main-app">
        <Sidebar className="bg-blue-400" />
        <Main />
      </div>
    );
  } else {
    return null;
  }
}
