import { HeaderCellSelect, CellSelect, useRowSelect } from "@table-library/react-table-library/select";
import { Body, Row, HeaderCell, Cell, Header, HeaderRow } from "@table-library/react-table-library/table";
import * as ReactTable from "@table-library/react-table-library/table";
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from "@table-library/react-table-library/theme";
import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
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

export function Table({ columns, values, handleUpdate, customGrid, state, onSelectChange, columnsCustom }) {
  const [editable, setEditable] = useState({ id: null, element: null })

  const theme = useTheme({
    ...getTheme(),
    Table: customGrid ? customGrid : `--data-table-library_grid-template-columns: repeat(${columns.length}, minmax(0, 1fr)); max-height: 406px;`
  });

  const nodes = { nodes: values }

  const select = onSelectChange && state ? useRowSelect(nodes, {
    onChange: onSelectChange,
    state: state
  }) : null;

  return (
    <ReactTable.Table data={nodes} select={select} theme={theme} layout={{ custom: true }}>
      {(tableList) => {
        const headerCells = columns.map((column) => {
          return (
            <HeaderCell
              key={uuid()}
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
                {select && <HeaderCellSelect />}
                {headerCells}
                {columnsCustom && columnsCustom.map((column) => {
                  return (
                    <HeaderCell
                      key={uuid()}
                      title={column.title}
                      resize={column.resize}>
                      {column.title}
                    </HeaderCell>
                  )
                })}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {

                const cells = columns.map((column) => {
                  const isEditable = Boolean(handleUpdate) && (editable.id === item.id && editable.element === column.key && column.editable);
                  const title = (!isNaN(new Date(item[column.key])) && column.type === "date") ? new Date(item[column.key]).toLocaleDateString("es-VE", { year: 'numeric', month: '2-digit', day: '2-digit', }) : !item[column.key] || item[column.key] === "" ? "N/A" : item[column.key];
                  const type = column.type === "date" ? "text" : column.type;

                  const onBlur = (event) => {
                    if (column.type === "text" || column.type === "number") {
                      const value = event.target.value.trim() === "" ? "N/A" : event.target.value.trim()
                      handleUpdate(value, item.id, column.key)
                    } else if (column.type === "date") {

                      if (event.target.value.trim() !== "N/A") {
                        const parsedDate = parseUserDate(event.target.value.trim());

                        if (parsedDate) {
                          handleUpdate(parsedDate, item.id, column.key)
                        } else {
                          handleUpdate("Fecha inválida", item.id, column.key)
                        }
                      } else {
                        handleUpdate("N/A", item.id, column.key)
                      }
                    }

                    setEditable({ id: null, element: null });
                  }

                  const onInput = (event) => {
                    if (type === "number") {
                      const setZero = Number(event.target.value) < 0 || isNaN(Number(event.target.value)) || !isFinite(Number(event.target.value))

                      if (setZero) {
                        event.target.value = 0;
                      }

                      event.target.value = Number.parseInt(event.target.value);
                    }
                  }

                  const onClick = () => {
                    setEditable({ id: item.id, element: column.key })
                  }

                  return (
                    <Cell key={column.key + item.id}>
                      <EditableCell onBlur={onBlur} onClick={onClick} onInput={onInput} editable={isEditable} title={title} type={type} />
                    </Cell>
                  )
                })

                return (
                  <Row className="bg-[transparent!important]" key={item.id} item={item}>
                    {state && <CellSelect item={item} />}
                    {cells}
                    {columnsCustom && columnsCustom.map((column) => {
                      return (
                        <Cell key={column.key}>
                          {column.children(item)}
                        </Cell>
                      )
                    })}
                  </Row>
                )
              })}
            </Body>
          </>
        )
      }}
    </ReactTable.Table>
  )
}
