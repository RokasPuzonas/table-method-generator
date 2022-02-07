import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { generate, TableColumns, TableMethodGeneratorOptions } from './TableMethodGenerator';

SyntaxHighlighter.registerLanguage('csharp', csharp);

interface Props {
	columns: TableColumns
	options?: TableMethodGeneratorOptions
}

function TableMethodCodeBlock(props: Props) {
	return (
		<div>
			<SyntaxHighlighter language="csharp" style={vs2015}>
				{generate(props.columns, props.options)}
			</SyntaxHighlighter>
		</div>
	)
}


export default TableMethodCodeBlock
