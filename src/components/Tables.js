import * as React from 'react';

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";

// export const Component = () => {
// 	const list = [
// 		{
// 			id: '1',
// 			name: 'VSCode',
// 			deadline: new Date(2020, 1, 17),
// 			type: 'SETUP',
// 			isComplete: true,
// 		},
// 		{
// 			id: '2',
// 			name: 'JavaScript',
// 			deadline: new Date(2020, 2, 28),
// 			type: 'LEARN',
// 			isComplete: true,
// 		},
// 		{
// 			id: '3',
// 			name: 'React',
// 			deadline: new Date(2020, 3, 8),
// 			type: 'LEARN',
// 			isComplete: false,
// 		}
// 	];
// 	const [search, setSearch] = React.useState("");


// 	const [data, setData] = React.useState({ nodes: list });


// 	const handleSearch = (event) => {
// 		setSearch(event.target.value);
// 	};

// 	// setData((state) => ({
// 	// 	...state,
// 	// 	nodes: state.nodes.map((node) => {
// 	// 		if (node.name === name) {
// 	// 			return { ...node, [property]: value };
// 	// 		} else {
// 	// 			return node;
// 	// 		}
// 	// 	}),
// 	// }));

// 	// setData((state)=>{
// 	// 	return {
// 	// 		nodes: state.nodes.filter((item) =>
// 	// 			item.name.toLowerCase().includes(search.toLowerCase())
// 	// 		),
// 	// 	}
// 	// })

// 	const handleUpdate = (value, id, property) => {
// 		setData((state) => ({
// 			...state,
// 			nodes: state.nodes.map((node) => {
// 				if (node.id === id) {
// 					return { ...node, [property]: value };
// 				} else {
// 					return node;
// 				}
// 			}),
// 		}));
// 	};

// 	const theme = useTheme(getTheme());

// 	const sort = useSort(
// 		data,
// 		{
// 			onChange: onSortChange,
// 		},
// 		{
// 			sortFns: {
// 				TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
// 				DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
// 				TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
// 				COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
// 				TASKS: (array) =>
// 					array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
// 			},
// 		}
// 	);

// 	function onSortChange(action, state) {
// 		console.log(action, state);
// 	}

// 	const COLUMNS = [
// 		{
// 			label: "Task",
// 			renderCell: (item) => item.name,
// 			sort: { sortKey: "TASK" },
// 			resize: true,
// 		},
// 		{
// 			label: "Deadline",
// 			renderCell: (item) =>
// 				item.deadline.toLocaleDateString("en-US", {
// 					year: "numeric",
// 					month: "2-digit",
// 					day: "2-digit",
// 				}),
// 			sort: { sortKey: "DEADLINE" },
// 			resize: true,
// 		},
// 		{
// 			label: "Type",
// 			renderCell: (item) => item.type,
// 			sort: { sortKey: "TYPE" },
// 			resize: true,
// 		},
// 		{
// 			label: "Complete",
// 			renderCell: (item) => item.isComplete.toString(),
// 			sort: { sortKey: "COMPLETE" },
// 			resize: true,
// 		},
// 		{
// 			label: "Tasks",
// 			renderCell: (item) => item.nodes?.length,
// 			sort: { sortKey: "TASKS" },
// 			resize: true,
// 		},
// 	];

// 	return (
// 		<>
// 			<label htmlFor="search">
// 				Search by Task:&nbsp;
// 				<input id="search" type="text" value={search} onChange={handleSearch} />
// 			</label>
// 			<br />

// 			<CompactTable columns={COLUMNS} data={data} theme={theme} sort={sort} />
// 		</>
// 	);
// };

// - hardwareName
// - type (Stack)
// - Serial
// - model
// - code
// - dateEntry
// - remark
// - location

// export default Component;


// const Component = () => {
// 	const COLUMNS = [
// 		{
// 			label: "Task",
// 			renderCell: (item) => (
// 				<input
// 					type="text"
// 					style={{
// 						width: "100%",
// 						border: "none",
// 						fontSize: "1rem",
// 						padding: 0,
// 						margin: 0,
// 					}}
// 					value={item.name}
// 					onChange={(event) =>
// 						handleUpdate(event.target.value, item.id, "name")
// 					}
// 				/>
// 			),
// 		},
// 		{
// 			label: "Deadline",
// 			renderCell: (item) => (
// 				<input
// 					type="date"
// 					style={{
// 						width: "100%",
// 						border: "none",
// 						fontSize: "1rem",
// 						padding: 0,
// 						margin: 0,
// 					}}
// 					value={item.deadline.toISOString().substr(0, 10)}
// 					onChange={(event) =>
// 						handleUpdate(new Date(event.target.value), item.id, "deadline")
// 					}
// 				/>
// 			),
// 		},
// 		{
// 			label: "Type",
// 			renderCell: (item) => (
// 				<select
// 					style={{
// 						width: "100%",
// 						border: "none",
// 						fontSize: "1rem",
// 						padding: 0,
// 						margin: 0,
// 					}}
// 					value={item.type}
// 					onChange={(event) =>
// 						handleUpdate(event.target.value, item.id, "type")
// 					}
// 				>
// 					<option value="SETUP">SETUP</option>
// 					<option value="LEARN">LEARN</option>
// 				</select>
// 			),
// 		},
// 		{
// 			label: "Complete",
// 			renderCell: (item) => (
// 				<input
// 					type="checkbox"
// 					checked={item.isComplete}
// 					onChange={(event) =>
// 						handleUpdate(event.target.checked, item.id, "isComplete")
// 					}
// 				/>
// 			),
// 		},
// 		{
// 			label: "Tasks",
// 			renderCell: (item) => (
// 				<input
// 					type="number"
// 					style={{
// 						width: "100%",
// 						border: "none",
// 						fontSize: "1rem",
// 						padding: 0,
// 						margin: 0,
// 					}}
// 					value={
// 						typeof item.nodes === "number" ? item.nodes : item.nodes?.length
// 					}
// 					onChange={(event) =>
// 						handleUpdate(Number(event.target.value), item.id, "nodes")
// 					}
// 				/>
// 			),
// 		},
// 	];

// 	return (
// 		<>
// 			<CompactTable columns={COLUMNS} data={data} theme={theme} />
// 		</>
// 	);
// };

// const Component = () => {
//   const [data, setData] = React.useState({ nodes });

//   const theme = useTheme(getTheme());

//   const handleUpdate = (value, id, property) => {
//     setData((state) => ({
//       ...state,
//       nodes: state.nodes.map((node) => {
//         if (node.id === id) {
//           return { ...node, [property]: value };
//         } else {
//           return node;
//         }
//       }),
//     }));
//   };

//   const COLUMNS = [
//     {
//       label: "Task",
//       renderCell: (item) => (
//         <input
//           type="text"
//           style={{
//             width: "100%",
//             border: "none",
//             fontSize: "1rem",
//             padding: 0,
//             margin: 0,
//           }}
//           value={item.name}
//           onChange={(event) =>
//             handleUpdate(event.target.value, item.id, "name")
//           }
//         />
//       ),
//     },
//     {
//       label: "Deadline",
//       renderCell: (item) => (
//         <input
//           type="date"
//           style={{
//             width: "100%",
//             border: "none",
//             fontSize: "1rem",
//             padding: 0,
//             margin: 0,
//           }}
//           value={item.deadline.toISOString().substr(0, 10)}
//           onChange={(event) =>
//             handleUpdate(new Date(event.target.value), item.id, "deadline")
//           }
//         />
//       ),
//     },
//     {
//       label: "Type",
//       renderCell: (item) => (
//         <select
//           style={{
//             width: "100%",
//             border: "none",
//             fontSize: "1rem",
//             padding: 0,
//             margin: 0,
//           }}
//           value={item.type}
//           onChange={(event) =>
//             handleUpdate(event.target.value, item.id, "type")
//           }
//         >
//           <option value="SETUP">SETUP</option>
//           <option value="LEARN">LEARN</option>
//         </select>
//       ),
//     },
//     {
//       label: "Complete",
//       renderCell: (item) => (
//         <input
//           type="checkbox"
//           checked={item.isComplete}
//           onChange={(event) =>
//             handleUpdate(event.target.checked, item.id, "isComplete")
//           }
//         />
//       ),
//     },
//     {
//       label: "Tasks",
//       renderCell: (item) => (
//         <input
//           type="number"
//           style={{
//             width: "100%",
//             border: "none",
//             fontSize: "1rem",
//             padding: 0,
//             margin: 0,
//           }}
//           value={
//             typeof item.nodes === "number" ? item.nodes : item.nodes?.length
//           }
//           onChange={(event) =>
//             handleUpdate(Number(event.target.value), item.id, "nodes")
//           }
//         />
//       ),
//     },
//   ];

//   return (
//     <>
//       <CompactTable columns={COLUMNS} data={data} theme={theme} />

//       <br />
//       <DocumentationSee anchor={"Features/Editable"} />
//     </>
//   );
// };

// export default Component;