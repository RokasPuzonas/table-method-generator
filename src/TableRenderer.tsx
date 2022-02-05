import { render_table, TableDefinition } from "./TableMethodGenerator"

export interface TableRendererProps {
	definition: TableDefinition,
	entries: string[][]
}

function TableRenderer(props: TableRendererProps) {
	return (
		<pre>
			{render_table(props.definition, props.entries)}
		</pre>
	)
}

export default TableRenderer
