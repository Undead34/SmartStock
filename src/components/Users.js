import React, { useEffect, useState } from "react";
import { VscTrash } from "react-icons/vsc";
import Select from "react-select";
import { Table } from "./Tables"
import { toast } from "sonner";
import Header from "./Header"

function Users() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await window.SmartStock.invoke("smartstock:get:users");
      setData(response)
      return response;
    } catch (error) {
      setData([])
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "SmartStock - Stock";
    getData();
  }, []);

  const rolesOption = [
    {
      value: "admin",
      label: "Administrador",
    }, {
      value: "user",
      label: "Usuario",
    }
  ]

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

  const columns = [
    {
      key: "ID",
      title: "ID",
      resize: true,
      type: "text",
      editable: false,
      random: true
    },
    {
      key: "FullName",
      title: "Nombre",
      resize: true,
      type: "text",
      editable: false,
      random: true
    },
    {
      key: "Email",
      title: "Correo electrónico",
      resize: true,
      type: "text",
      editable: false,
      random: true
    },
    {
      key: "Role",
      title: "Rol",
      resize: true,
      type: "text",
      editable: false,
      random: true,
      custom: true,
      children: (item) => {
        return (
          <div className="flex">
            <Select
              className="text-sm w-full flex-1"
              defaultValue={item.Role === "admin" ? rolesOption[0] : rolesOption[1]}
              isSearchable={false}
              styles={styles.select}
              menuPortalTarget={document.body}
              options={rolesOption}
              onChange={async (tags) => {
                const user = await window.SmartStock.invoke("smartstock:get:userinfo", { id: localStorage.getItem("ID") });

                if (user.Role !== "admin") {
                  toast.error("Sólo los administradores pueden editar los roles");
                  getData();
                  return
                }

                const action = {
                  id: item.ID,
                  role: tags.value
                }

                if (item.Role === tags.value) {
                  return;
                }

                const response = await window.SmartStock.invoke("smartstock:set:role", action)

                if (response) {
                  toast.success("¡Rol de usuario cambiado con éxito!");

                  if (user.ID === item.ID) {
                    window.location.reload();
                  }

                } else {
                  toast.error("Error al cambiar el rol de usuario, recuerde que debe haber al menos un administrador");
                }

                getData();
              }}
            />
          </div>
        )
      },
    },
    {
      key: "Delete",
      title: "Borrar",
      resize: false,
      type: "text",
      editable: false,
      random: true,
      custom: true,
      children: (item) => {
        async function deleteUser(item) {
          try {
            const user = await window.SmartStock.invoke("smartstock:get:userinfo", { id: localStorage.getItem("ID") });

            if (user.Role !== "admin") {
              toast.error("Sólo los administradores pueden borrar usuarios");
              getData();
              return
            }

            if (user.ID === item.ID) {
              toast.error("No puede eliminar el usuario actual");
              getData();
              return
            }

            const response = await window.SmartStock.invoke("smartstock:delete:user", item.ID);

            if (response) {
              toast.success("¡Usuario borrado con éxito!");
            } else {
              toast.error("Error al borrar el usuario");
            }

            getData();
          } catch (error) {
            console.log(error)
          }
        }

        return (
          <div onClick={() => deleteUser(item)} className="flex font-semibold gap-2 justify-center items-center cursor-pointer rounded-md px-3 py-2 text-white bg-red-500 hover:bg-red-600">
            <VscTrash className="text-lg" />
            Borrar
          </div>
        )
      },
    },
  ];

  const customGrid =
    "--data-table-library_grid-template-columns: auto repeat(3, minmax(0, 1fr)) auto; max-height: 406px;";


  return (
    <div className="flex flex-col bg-[#fbfbfb] relative h-full w-full overflow-auto pb-10" style={{ contain: "content" }}>
      <Header title="Panel del adminstrador" />

      <div className="flex flex-col gap-4 px-10">
        <div className="bg-white p-2 shadow-sm rounded-md flex-1 h-11 w-full">
          <Table columns={columns} values={data} random customGrid={customGrid} />
        </div>
      </div>
    </div>
  );
}

export default Users;
