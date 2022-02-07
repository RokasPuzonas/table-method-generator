import { render_table, TableColumns } from "./TableMethodGenerator"

export interface TableRendererProps {
	columns: TableColumns,
	entries: string[][]
}

function TableRenderer(props: TableRendererProps) {
	return (
		<pre>
			{render_table(props.columns, props.entries)}
		</pre>
	)
}

export default TableRenderer
