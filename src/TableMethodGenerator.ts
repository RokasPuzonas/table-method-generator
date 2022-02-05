type Alignment = "left"|"right"

export interface TableDefinition {
	names?: string[]
	fields?: (string|undefined)[]
	widths?: (number|undefined)[]
	alignments?: (Alignment|undefined)[]
}

export interface TableMethodGeneratorOptions {
	definition: TableDefinition

	method_name?: string
	empty_message?: string

	container_type?: string
	container_name?: string
	entry_type?: string
	entry_name?: string
}

function get_total_width(definition: TableDefinition): number {
	let names = definition.names || []
	if (names.length == 0) { return 0; }

	let total_width = 0
	let widths = definition.widths || []
	for (let i = 0; i < names.length; i++) {
		const name = names[i]
		total_width += widths[i] || name.length
	}
	total_width += 2 + 2;
	total_width += 3*(names.length-1);

	return total_width;
}

export function generate(options: TableMethodGeneratorOptions): string {
	const section_names = options.definition.names || []
	const method_name = options.method_name || "PrintTable"
	if (section_names.length == 0) {
		return `static void ${method_name}()\n{\n}`;
	}

	const empty_message = options.empty_message || "Empty"
	const container_name = options.container_name || "container"
	const container_type = options.container_type || "Container"
	const entry_name = options.entry_name || "e"
	const entry_type = options.entry_type || "Entry"
	const section_widths = options.definition.widths || []
	const section_alignments = options.definition.alignments || []
	const section_fields = options.definition.fields || []

	// Total width
	const total_width = get_total_width(options.definition)

	// Table row
	let row_components: string[] = []
	for (let i = 0; i < section_names.length; i++) {
		const section = section_names[i]
		const width = section_widths[i] || section.length
		const alighment = section_alignments[i] || "right"
		if (alighment == "left") {
			row_components.push(`{${i},-${width}}`)
		} else {
			row_components.push(`{${i},${width}}`)
		}
	}

	let table_row = "";
	if (row_components.length > 0) {
		table_row = "| " + row_components.join(" | ") + " |"
	}

	// Section names
	const joined_names = section_names.map((n) => `"${n}"`).join(", ")

	// Section fields
	const formatted_fields = []
	for (let i = 0; i < section_names.length; i++) {
		if (section_fields[i]) {
			formatted_fields.push(`${entry_name}.${section_fields[i]}`)
		} else {
			formatted_fields.push(`"-"`)
		}
	}
	const joined_fields = formatted_fields.join(", ")

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

function render_table_row(definition: TableDefinition, entry: string[]): string {
	let names = definition.names || []
	if (names.length == 0) { return ""; }

	const columns: string[] = []
	const alighments = definition.alignments || []
	const widths = definition.widths || []
	for (let i = 0; i < names.length; i++) {
		const value = entry[i] || "";
		const alighment = alighments[i] || "right"
		const width = widths[i] || names[i].length

		const filler = " ".repeat(Math.max(width - value.length, 0));
		if (alighment == "left") {
			columns.push(value + filler);
		} else {
			columns.push(filler + value);
		}
	}
	return "| " + columns.join(" | ") + " |"
}

export function render_table(definition: TableDefinition, entries: string[][]): string {
	if (!definition.names) {return ""; }

	const total_width = get_total_width(definition)
	const seperator = "-".repeat(total_width)

	const lines = []
	lines.push(seperator)
	lines.push(render_table_row(definition, definition.names))
	lines.push(seperator)
	for (let i = 0; i < entries.length; i++) {
		lines.push(render_table_row(definition, entries[i]))
	}
	lines.push(seperator)

	return lines.join("\n")
}
