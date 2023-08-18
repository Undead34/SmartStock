import { HeaderCellSelect, CellSelect, useRowSelect } from "@table-library/react-table-library/select";
import { Body, Row, HeaderCell, Cell, } from "@table-library/react-table-library/table";
import { Table, Header, HeaderRow } from "@table-library/react-table-library/table";
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from "@table-library/react-table-library/theme";
import React, { useState } from "react";
import { toast } from "sonner"
import moment from "moment"

function parseUserDate(input) {
  const formats = ["DD-MM-YYYY", "DD/MM/YYYY"];
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

function EditableCell({ editable, onClick, onBlur, title, type, onInput }) {
  if (editable) {
    return (
      <input
        className="w-full"
        type={type || "text"}
        defaultValue={title}
        onBlur={onBlur}
        onInput={onInput}
      />
    )
  }

  return (
    <div className="overflow-hidden text-ellipsis" onClick={onClick} title={title}>
      {title}
    </div>
  )
}

export function StockTable({ onSelectChange, nodes, state, handleUpdate }) {
  const [editable, setEditable] = useState({ id: null, element: null })

  let theme = getTheme()
  theme.Table = " --data-table-library_grid-template-columns:  auto minmax(180px, 1fr) repeat(6, minmax(0, 1fr)); max-height: 406px;"
  theme = useTheme(theme);

  const data = { nodes }

  const select = useRowSelect(data, {
    onChange: onSelectChange,
    state: state
  });

  return (
    <Table data={data} theme={theme} select={select} layout={{ custom: true }}>
      {(tableList) => {
        return (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell resize>Nombre del equipo</HeaderCell>
                <HeaderCell resize>Tipo de equipo</HeaderCell>
                <HeaderCell resize>Número de serie</HeaderCell>
                <HeaderCell resize>Modelo</HeaderCell>
                <HeaderCell resize>Código</HeaderCell>
                <HeaderCell resize>Cantidad</HeaderCell>
                <HeaderCell>Descripción</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {
                return (
                  <Row className="bg-[transparent!important]" key={item.id} item={item}>
                    <CellSelect item={item} />
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.equipment_name}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "equipment_name")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.equipment_name })}
                        title={item.equipment_name}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.equipment_type}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "equipment_type")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.equipment_type })}
                        title={item.equipment_type}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.serial_number}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "serial_number")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.serial_number })}
                        title={item.serial_number}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.model}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "model")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.model })}
                        title={item.model}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.code}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "code")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.code })}
                        title={item.code}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell type="number" editable={editable.id === item.id && editable.element === item.stock}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "stock")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.stock })}
                        onInput={(event) => {
                          const setZero = Number(event.target.value) < 0 || isNaN(Number(event.target.value)) || !isFinite(Number(event.target.value))
                          if (setZero) {
                            event.target.value = 0
                          }
                          event.target.value = Number.parseInt(event.target.value)
                        }}
                        title={item.stock}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.observation}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "observation")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.observation })}
                        title={item.observation}
                      />
                    </Cell>
                  </Row>
                )
              })}
            </Body>
          </>
        )
      }}
    </Table>
  )
}


export function CustomersTable({ nodes, handleUpdate, onSelectChange, state }) {
  const [editable, setEditable] = useState({ id: null, element: null })

  let theme = getTheme()
  theme.Table = " --data-table-library_grid-template-columns: auto minmax(180px, 1fr) repeat(4, minmax(0, 1fr)); max-height: 406px;"
  theme = useTheme(theme);

  const data = { nodes }


  const select = useRowSelect(data, {
    onChange: onSelectChange,
    state: state
  });

  return (
    <Table data={data} select={select} theme={theme} layout={{ custom: true }}>
      {(tableList) => {
        return (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell resize>Nombre</HeaderCell>
                <HeaderCell resize>Email</HeaderCell>
                <HeaderCell resize>País</HeaderCell>
                <HeaderCell resize>Código</HeaderCell>
                <HeaderCell>Descripción</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {
                return (
                  <Row className="bg-[transparent!important]" key={item.id} item={item}>
                    <CellSelect item={item} />
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.customer_name}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "customer_name")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.customer_name })}
                        title={item.customer_name}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.customer_email}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "customer_email")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.customer_email })}
                        title={item.customer_email}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.customer_country}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "customer_country")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.customer_country })}
                        title={item.customer_country}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.code}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "code")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.code })}
                        title={item.code}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.observation}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "observation")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.observation })}
                        title={item.observation}
                      />
                    </Cell>
                  </Row>
                )
              })}
            </Body>
          </>
        )
      }}
    </Table>
  )
}


export function ControlTable({ nodes, handleUpdate }) {
  const [editable, setEditable] = useState({ id: null, element: null })

  let theme = getTheme()
  theme.Table = " --data-table-library_grid-template-columns: minmax(180px, 1fr) repeat(5, minmax(0, 1fr)); max-height: 406px;"
  theme = useTheme(theme);

  const data = { nodes }

  return (
    <Table data={data} theme={theme} layout={{ custom: true }}>
      {(tableList) => {
        return (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize>Nombre del equipo</HeaderCell>
                <HeaderCell resize>Tipo de equipo</HeaderCell>
                <HeaderCell resize>Cantidad</HeaderCell>
                <HeaderCell resize>Vendidos</HeaderCell>
                <HeaderCell resize>Código</HeaderCell>
                <HeaderCell>Observación</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {
                return (
                  <Row className="bg-[transparent!important]" key={item.id} item={item}>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.equipment_name}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "equipment_name")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.equipment_name })}
                        title={item.equipment_name}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.equipment_type}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "equipment_type")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.equipment_type })}
                        title={item.equipment_type}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell type="number" editable={editable.id === item.id && editable.element === item.stock}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "stock")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.stock })}
                        onInput={(event) => {
                          const setZero = Number(event.target.value) < 0 || isNaN(Number(event.target.value)) || !isFinite(Number(event.target.value))
                          if (setZero) {
                            event.target.value = 0
                          }
                          event.target.value = Number.parseInt(event.target.value)
                        }}
                        title={item.stock}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell type="number" editable={editable.id === item.id && editable.element === item.sold}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "sold")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.sold })}
                        onInput={(event) => {
                          const setZero = Number(event.target.value) < 0 || isNaN(Number(event.target.value)) || !isFinite(Number(event.target.value))
                          if (setZero) {
                            event.target.value = 0
                          }
                          event.target.value = Number.parseInt(event.target.value)
                        }}
                        title={item.sold}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.code}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "code")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.code })}
                        title={item.code}
                      />
                    </Cell>
                    <Cell>
                      <EditableCell editable={editable.id === item.id && editable.element === item.observation}
                        onBlur={(event) => {
                          setEditable(!editable);
                          const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                          handleUpdate(value, item.id, "observation")
                          toast.success("Guardado con exito!");
                        }}
                        onClick={() => setEditable({ id: item.id, element: item.observation })}
                        title={item.observation}
                      />
                    </Cell>
                  </Row>
                )
              })}
            </Body>
          </>
        )
      }}
    </Table>
  )
}

export function TrackingTable({ columns, values }) {
  const theme = useTheme({
    ...getTheme(),
    Table: `--data-table-library_grid-template-columns: repeat(${columns.length}, minmax(0, 1fr)); max-height: 406px;`
  });

  return (
    <Table data={{ nodes: values }} theme={theme} layout={{ custom: true }}>
      {(tableList) => {
        const headerCells = columns.map((column) => {
          return (
            <HeaderCell
              key={Math.random() * 1000}
              title={column.title}
              resize={column.resize}>
              {column.title}
            </HeaderCell>
          )
        })
        return (
          <>
            <Header>
              <HeaderRow>
                {headerCells}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {

                const cells = columns.map((column) => {
                  return (
                    <Cell key={Math.random() * 1000}>
                      {item[column.key].toString()}
                    </Cell>
                  )
                })

                return (
                  <Row className="bg-[transparent!important]" key={item.id} item={item}>
                    {cells}
                  </Row>
                )
              })}
            </Body>
          </>
        )
      }}
    </Table>
  )
}

       // {
                //   id: "11",
                //   order_code: "654321",
                //   customer_name: "Microsoft",
                //   customer_code: "US-MS001",
                //   observation: "En camino",
                //   entry_date: new Date(2023, 6, 15),
                //   departure_date: "N/A",
                //   arrival_date: "N/A",
                //   status: "En proceso de compra",
                //   code: "KEYBOARD01",
                //   amount: 20,
                // },

                // const columns = [
                //   { key: "customer_name", title: "Nombre del cliente", resize: true },
                //   { key: "order_code", title: "Código del pedido", resize: true },
                //   { key: "code", title: "Código del producto", resize: true },
                //   { key: "amount", title: "Cantidad", resize: true, type: "number" },
                //   { key: "entry_date", title: "Fecha de entrada", resize: true },
                //   { key: "departure_date", title: "Fecha de salida", resize: true },
                //   { key: "arrival_date", title: "Fecha de llegada", resize: true },
                //   { key: "status", title: "Estado", resize: true },
                //   { key: "observation", title: "Observación", resize: true },
                // ];

/*
                    {columns.map((column) => (
                      <Cell key={column.key}>
                        {column.type === "number"
                          ? <input
                            type="number"
                            defaultValue={row[column.key]}
                            onBlur={(event) => {
                              // Handle update and toast success
                            }}
                          />
                          : row[column.key]}
                      </Cell>
                    ))}
*/


  // editable={editable.id === item.id && editable.element === item.customer_name}
  // onBlur={(event) => {
  //   setEditable(!editable);
  //   const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
  //   handleUpdate(value, item.id, "customer_name")
  //   toast.success("Guardado con exito!");
  // }}
  // onClick={() => setEditable({ id: item.id, element: item.customer_name })}
  // title={item.customer_name}
  // {
  //   id: "11",
  //   order_code: "654321",
  //   customer_name: "Microsoft",
  //   customer_code: "US-MS001",
  //   observation: "En camino",
  //   entry_date: new Date(2023, 6, 15),
  //   departure_date: "N/A",
  //   arrival_date: "N/A",
  //   status: "En proceso de compra",
  //   code: "KEYBOARD01",
  //   amount: 20,
  // },



// const [editable, setEditable] = useState({ id: null, element: null })

// let theme = getTheme()
// theme.Table = " --data-table-library_grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, min-content) repeat(5, minmax(0, 1fr)); max-height: 406px;"
// theme = useTheme(theme);

// const data = { nodes }

// return (
//   <Table data={data} theme={theme} layout={{ custom: true }}>
//     {(tableList) => {
//       return (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCell title="Nombre del cliente" resize>Nombre del cliente</HeaderCell>
//               <HeaderCell title="Código del pedido" resize>Código del pedido</HeaderCell>
//               <HeaderCell title="Código del producto" resize>Código del producto</HeaderCell>
//               <HeaderCell title="Cantidad" resize>Cantidad</HeaderCell>
//               <HeaderCell title="Fecha de entrada" resize>Fecha de entrada</HeaderCell>
//               <HeaderCell title="Fecha de salida" resize>Fecha de salida</HeaderCell>
//               <HeaderCell title="Fecha de llegada" resize>Fecha de llegada</HeaderCell>
//               <HeaderCell title="Estado" resize>Estado</HeaderCell>
//               <HeaderCell title="Observación">Observación</HeaderCell>
//             </HeaderRow>
//           </Header>
//           <Body>
//             {tableList.map((item) => {
//               return (
//                 <Row className="bg-[transparent!important]" key={item.id} item={item}>
//                   <Cell>
//                     <EditableCell editable={editable.id === item.id && editable.element === item.customer_name}
//                       onBlur={(event) => {
//                         setEditable(!editable);
//                         const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
//                         handleUpdate(value, item.id, "customer_name")
//                         toast.success("Guardado con exito!");
//                       }}
//                       onClick={() => setEditable({ id: item.id, element: item.customer_name })}
//                       title={item.customer_name}
//                     />
//                   </Cell>
//
//                 </Row>
//               )
//             })}
//           </Body>
//         </>
//       )
//     }}
//   </Table>
// )




/*
  <Cell>
//                     <EditableCell editable={editable.id === item.id && editable.element === item.order_code}
//                       onBlur={(event) => {
//                         setEditable(!editable);
//                         const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
//                         handleUpdate(value, item.id, "order_code")
//                         toast.success("Guardado con exito!");
//                       }}
//                       onClick={() => setEditable({ id: item.id, element: item.order_code })}
//                       title={item.order_code}
//                     />
//                   </Cell>
//                   <Cell>
//                     <EditableCell editable={editable.id === item.id && editable.element === item.code}
//                       onBlur={(event) => {
//                         setEditable(!editable);
//                         const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
//                         handleUpdate(value, item.id, "code")
//                         toast.success("Guardado con exito!");
//                       }}
//                       onClick={() => setEditable({ id: item.id, element: item.code })}
//                       title={item.code}
//                     />
//                   </Cell>
//                   <Cell>
//                     <EditableCell type="number" editable={editable.id === item.id && editable.element === item.amount}
//                       onBlur={(event) => {
//                         setEditable(!editable);
//                         const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
//                         handleUpdate(value, item.id, "amount")
//                         toast.success("Guardado con exito!");
//                       }}
//                       onClick={() => setEditable({ id: item.id, element: item.amount })}
//                       onInput={(event) => {
//                         const setZero = Number(event.target.value) < 0 || isNaN(Number(event.target.value)) || !isFinite(Number(event.target.value))
//                         if (setZero) {
//                           event.target.value = 0
//                         }
//                         event.target.value = Number.parseInt(event.target.value)
//                       }}
//                       title={item.amount}
//                     />
//                   </Cell>
//                   <Cell>
//                     <Cell>
//                       <EditableCell
//                         editable={editable.id === item.id && editable.element === item.entry_date}
//                         title={!isNaN(new Date(item.entry_date)) ? new Date(item.entry_date).toLocaleDateString("es-VE", { year: 'numeric', month: '2-digit', day: '2-digit', }) : item.entry_date}
//                         onClick={() => setEditable({ id: item.id, element: item.entry_date })}
//                         onBlur={(event) => {
//                           setEditable({ id: null, element: null });

//                           if (event.target.value.trim() !== "N/A") {
//                             const parsedDate = parseUserDate(event.target.value.trim());

//                             if (parsedDate) {
//                               handleUpdate(parsedDate, item.id, "entry_date")
//                             } else {
//                               handleUpdate("Fecha inválida", item.id, "entry_date")
//                             }
//                           } else {
//                             handleUpdate("N/A", item.id, "entry_date")
//                           }

//                           toast.success("Guardado con exito!");
//                         }} />
//                     </Cell>
//                   </Cell>
//                   <Cell>
//                     <EditableCell
//                       editable={editable.id === item.id && editable.element === item.departure_date}
//                       title={!isNaN(new Date(item.departure_date)) ? new Date(item.departure_date).toLocaleDateString("es-VE", { year: 'numeric', month: '2-digit', day: '2-digit', }) : item.departure_date}
//                       onClick={() => setEditable({ id: item.id, element: item.departure_date })}
//                       onBlur={(event) => {
//                         setEditable({ id: null, element: null });

//                         if (event.target.value.trim() !== "N/A") {
//                           const parsedDate = parseUserDate(event.target.value.trim());

//                           if (parsedDate) {
//                             handleUpdate(parsedDate, item.id, "departure_date")
//                           } else {
//                             handleUpdate("Fecha inválida", item.id, "departure_date")
//                           }
//                         } else {
//                           handleUpdate("N/A", item.id, "departure_date")
//                         }

//                         toast.success("Guardado con exito!");
//                       }} />
//                   </Cell>
//                   <Cell>
//                     <EditableCell
//                       editable={editable.id === item.id && editable.element === item.arrival_date}
//                       title={!isNaN(new Date(item.arrival_date)) ? new Date(item.arrival_date).toLocaleDateString("es-VE", { year: 'numeric', month: '2-digit', day: '2-digit', }) : item.arrival_date}
//                       onClick={() => setEditable({ id: item.id, element: item.arrival_date })}
//                       onBlur={(event) => {
//                         setEditable({ id: null, element: null });

//                         if (event.target.value.trim() !== "N/A") {
//                           const parsedDate = parseUserDate(event.target.value.trim());

//                           if (parsedDate) {
//                             handleUpdate(parsedDate, item.id, "arrival_date")
//                           } else {
//                             handleUpdate("Fecha inválida", item.id, "arrival_date")
//                           }
//                         } else {
//                           handleUpdate("N/A", item.id, "arrival_date")
//                         }

//                         toast.success("Guardado con exito!");
//                       }} />
//                   </Cell>
//                   <Cell>
//                     <EditableCell editable={editable.id === item.id && editable.element === item.status}
//                       onBlur={(event) => {
//                         setEditable(!editable);
//                         const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
//                         handleUpdate(value, item.id, "status")
//                         toast.success("Guardado con exito!");
//                       }}
//                       onClick={() => setEditable({ id: item.id, element: item.status })}
//                       title={item.status}
//                     />
//                   </Cell>
//                   <Cell>
//                     <EditableCell editable={editable.id === item.id && editable.element === item.observation}
//                       onBlur={(event) => {
//                         setEditable(!editable);
//                         const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
//                         handleUpdate(value, item.id, "observation")
//                         toast.success("Guardado con exito!");
//                       }}
//                       onClick={() => setEditable({ id: item.id, element: item.observation })}
//                       title={item.observation}
//                     />
//                   </Cell>
*/