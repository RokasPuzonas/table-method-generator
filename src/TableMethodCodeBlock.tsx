import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { generate, TableMethodGeneratorOptions } from './TableMethodGenerator';

SyntaxHighlighter.registerLanguage('csharp', csharp);

function TableMethodCodeBlock(props: TableMethodGeneratorOptions) {
	return (
		<SyntaxHighlighter language="csharp" style={vs2015}>
			{generate(props)}
		</SyntaxHighlighter>
	)
}

export default TableMethodCodeBlock
