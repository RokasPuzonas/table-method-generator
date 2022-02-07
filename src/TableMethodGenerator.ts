export type Alignment = "left"|"right"

export interface TableColumn {
	name: string
	field?: string
	width?: number
	alignment?: Alignment
}

export type TableColumns = TableColumn[]

export interface TableMethodGeneratorOptions {
	method_name?: string
	empty_message?: string

	container_type?: string
	container_name?: string
	entry_type?: string
	entry_name?: string
}

function get_total_width(columns: TableColumns): number {
	let total_width = 0;

	for (const column of columns) {
		total_width += column.width || column.name.length
	}
	total_width += 2 + 2;
	total_width += 3*(columns.length-1);

	return total_width;
}

export function generate(columns: TableColumns, options?: TableMethodGeneratorOptions): string {
	const method_name = options?.method_name || "PrintTable"
	if (columns.length === 0) {
		return `static void ${method_name}()\n{\n}`;
	}

	const empty_message = options?.empty_message || "Empty"
	const container_name = options?.container_name || "container"
	const container_type = options?.container_type || "Container"
	const entry_name = options?.entry_name || "e"
	const entry_type = options?.entry_type || "Entry"

	// Total width
	const total_width = get_total_width(columns)

	// Table row
	let row_components: string[] = []
	for (let i = 0; i < columns.length; i++) {
		const width = columns[i].width || columns[i].name.length
		const alighment = columns[i].alignment || "right"
		if (alighment === "left") {
			row_components.push(`{${i},-${width}}`)
		} else {
			row_components.push(`{${i},${width}}`)
		}
	}

	const table_row = "| " + row_components.join(" | ") + " |"

	// Section names
	const joined_names = columns.map((c) => `"${c.name}"`).join(", ")

	// Section fields
	const joined_fields = columns.map((column) => {
		if (column.field) {
			return `${entry_name}.${column.field}`
		} else {
			return `"-"`
		}
	}).join(", ")

	// Final code string
	return `static void ${method_name}(${container_type} ${container_name})\n{
	if (${container_name}.Count == 0)
	{
		Console.WriteLine("${empty_message}");
		return;
	}

	Console.WriteLine(new string('-', ${total_width}));
	Console.WriteLine("${table_row}", ${joined_names});
	Console.WriteLine(new string('-', ${total_width}));
	for (int i = 0; i < ${container_name}.Count; i++)
	{
		${entry_type} ${entry_name} = ${container_name}.Get(i);
		Console.WriteLine("${table_row}", ${joined_fields});
	}
	Console.WriteLine(new string('-', ${total_width}));\n}`;
}

function render_table_row(columns: TableColumns, entry: (string|undefined)[]): string {
	if (columns.length === 0) { return "" }

	let formated_cells = []
	for (let i = 0; i < columns.length; i++) {
 		const alighment = columns[i].alignment || "right"
 		const width = columns[i].width || columns[i].name.length

 		const value = entry[i] || "";
 		const filler = " ".repeat(Math.max(width - value.length, 0));
 		if (alighment === "left") {
 			formated_cells.push(value + filler);
 		} else {
 			formated_cells.push(filler + value);
 		}
	}

	return "| " + formated_cells.join(" | ") + " |"
}

export function render_table(columns: TableColumns, entries: string[][]): string {
	if (columns.length === 0) { return "" }

	const total_width = get_total_width(columns)
	const seperator = "-".repeat(total_width)

	const column_names = columns.map((column) => column.name)
	const lines = []
	lines.push(seperator)
	lines.push(render_table_row(columns, column_names))
	lines.push(seperator)
	for (let i = 0; i < entries.length; i++) {
		lines.push(render_table_row(columns, entries[i]))
	}
	lines.push(seperator)

	return lines.join("\n")
}
