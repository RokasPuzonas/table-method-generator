import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { TableDefinition } from './App';

export interface TableMethodGeneratorProps {
	definition: TableDefinition

	method_name?: string
	empty_message?: string

	container_type?: string
	container_name?: string
	entry_type?: string
	entry_name?: string
}

function generateTableMethod(props: TableMethodGeneratorProps): string {
	const section_names = props.definition.names || []
	const method_name = props.method_name || "PrintTable"
	if (section_names.length == 0) {
		return `static void ${method_name}()\n{\n}`;
	}

	const empty_message = props.empty_message || "Empty"
	const container_name = props.container_name || "container"
	const container_type = props.container_type || "Container"
	const entry_name = props.entry_name || "e"
	const entry_type = props.entry_type || "Entry"
	const section_widths = props.definition.widths || []
	const section_alignments = props.definition.alighments || []
	const section_fields = props.definition.fields || []

	// Total width
	let total_width = 0
	for (let i = 0; i < section_names.length; i++) {
		const section = section_names[i]
		total_width += section_widths[i] || section.length
	}
	total_width += 2 + 2;
	total_width += 3*(section_names.length-1);

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

function TableMethodCode(props: TableMethodGeneratorProps) {
	return (
		<div>
			<SyntaxHighlighter language="csharp" style={docco}>
				{generateTableMethod(props)}
			</SyntaxHighlighter>
		</div>
	)
}

export default TableMethodCode
