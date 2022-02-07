import { ChangeEvent, useState } from "react"
import { Alignment, TableColumn, TableColumns } from "./TableMethodGenerator"


interface TableColumnProps {
	value: TableColumn
	onChange: { (e: TableColumn): void }
}

function TableDefinitionRow(props: TableColumnProps) {
	let [, setName] = useState(props.value.name)
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		props.value.name = e.target.value
		setName(props.value.name)
		props.onChange(props.value)
	}

	let [, setField] = useState(props.value.field)
	const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
		props.value.field = e.target.value
		setField(props.value.field)
		props.onChange(props.value)
	}

	let [, setWidth] = useState(props.value.width)
	const onChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
		props.value.width = parseFloat(e.target.value)
		setWidth(props.value.width)
		props.onChange(props.value)
	}

	let [, setAlignment] = useState(props.value.alignment)
	const onChangeAlignment = (e: ChangeEvent<HTMLSelectElement>) => {
		props.value.alignment = e.target.value as Alignment
		setAlignment(props.value.alignment)
		props.onChange(props.value)
	}

	return (
		<li>
			<input type="text" value={props.value.name} onChange={onChangeName} />
			<input type="text" value={props.value.field} onChange={onChangeField} />
			<input type="number" value={props.value.width || props.value.name.length} onChange={onChangeWidth}/>
			<select value={props.value.alignment} onChange={onChangeAlignment}>
				<option value="right">Right</option>
				<option value="left">Left</option>
			</select>
		</li>
	)
}

interface TableDefinitionProps {
	value: TableColumns
	onChange?: { (e: TableColumns): void }
}

function TableDefinitionForm(props: TableDefinitionProps) {
	let [currentName, setCurrentName] = useState("")

	let [columns, setColumns] = useState<TableColumns>(props.value)

	const addRow = () => {
		columns.push({ name: currentName })
		setCurrentName("")
		if (props.onChange !== undefined) {
			props.onChange(columns)
		}
	}

	const updateRow = (i: number, column: TableColumn) => {
		if (column.name === "") {
			columns.splice(i, 1)
			setColumns([...columns])
		} else {
			columns[i] = column
			setColumns([...columns])
		}
		if (props.onChange !== undefined) {
			props.onChange(columns)
		}
	}

  return (
		<form onSubmit={(e) => e.preventDefault()}>
			<label>Column:</label>
			<input
				type="text"
				value={currentName}
				onChange={(e) => setCurrentName(e.target.value)}
				onKeyPress={(e) => e.key === "Enter" && addRow()}
			/>
			<ol>
				{columns.map((item, i) =>
					<TableDefinitionRow key={i} value={item} onChange={(e) => updateRow(i, e)}/>
				)}
			</ol>
		</form>
	)
}

export default TableDefinitionForm
