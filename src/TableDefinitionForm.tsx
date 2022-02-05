import { ChangeEvent, useState } from "react"
import { Alignment, TableDefinition } from "./TableMethodGenerator"


interface TableDefinitionRowProps {
	value: Row
	onChange?: { (e: Row): void }
}

function TableDefinitionRow(props: TableDefinitionRowProps) {
	let [, setName] = useState(props.value.name)
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		props.value.name = e.target.value
		setName(props.value.name)
		if (props.onChange) {
			props.onChange(props.value)
		}
	}

	let [, setField] = useState(props.value.field)
	const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
		props.value.field = e.target.value
		setField(props.value.field)
		if (props.onChange) {
			props.onChange(props.value)
		}
	}

	let [, setWidth] = useState(props.value.width)
	const onChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
		props.value.width = parseFloat(e.target.value)
		setWidth(props.value.width)
		if (props.onChange) {
			props.onChange(props.value)
		}
	}

	let [, setAlignment] = useState(props.value.alighment)
	const onChangeAlignment = (e: ChangeEvent<HTMLSelectElement>) => {
		props.value.alighment = e.target.value as Alignment
		setAlignment(props.value.alighment)
		if (props.onChange) {
			props.onChange(props.value)
		}
	}

	return (
		<li>
			<input type="text" value={props.value.name} onChange={onChangeName} />
			<input type="text" value={props.value.field} onChange={onChangeField} />
			<input type="number" value={props.value.width || props.value.name.length} onChange={onChangeWidth}/>
			<select value={props.value.alighment} onChange={onChangeAlignment}>
				<option value="right">Right</option>
				<option value="left">Left</option>
			</select>
		</li>
	)
}

interface TableDefinitionProps {
	value: TableDefinition
	onChange?: { (e: TableDefinition): void }
}

interface Row {
	name: string
	width?: number
	field?: string
	alighment?: Alignment
}

function intoRows(definition: TableDefinition): Row[] {
	const rows: Row[] = []
	if (definition.names !== undefined) {
		for (let i = 0; i < definition.names.length; i++) {
			rows.push({
				name: definition.names[i],
				width: (definition.widths || [])[i],
				field: (definition.fields || [])[i],
				alighment: (definition.alignments || [])[i],
			})
		}
	}
	return rows
}

function fromRows(rows: Row[]): TableDefinition {
	const definition: TableDefinition = {
		names: [],
		widths: [],
		fields: [],
		alignments: []
	}
	for (const row of rows) {
		(definition.names as string[]).push(row.name);
		(definition.widths as (number|undefined)[]).push(row.width);
		(definition.fields as (string|undefined)[]).push(row.field);
		(definition.alignments as (Alignment|undefined)[]).push(row.alighment);
	}
	return definition
}

function TableDefinitionForm(props: TableDefinitionProps) {
	let [currentName, setCurrentName] = useState("")

	let [rows, setRows] = useState<Row[]>(intoRows(props.value))

	const addRow = () => {
		rows.push({ name: currentName })
		setCurrentName("")
		if (props.onChange !== undefined) {
			props.onChange(fromRows(rows))
		}
	}

	const updateRow = (i: number, row: Row) => {
		if (row.name === "") {
			rows.splice(i, 1)
			rows = [...rows]
			setRows(rows)
		} else {
			rows = [...rows]
			rows[i] = row
			setRows(rows)
		}
		if (props.onChange !== undefined) {
			props.onChange(fromRows(rows))
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
				{
					rows.map((item, i) =>
						<TableDefinitionRow key={i} value={item} onChange={(e) => updateRow(i, e)}/>
					)
				}
			</ol>
		</form>
	)
}

export default TableDefinitionForm
