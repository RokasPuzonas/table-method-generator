import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { generate, TableMethodGeneratorOptions } from './TableMethodGenerator';

SyntaxHighlighter.registerLanguage('csharp', csharp);

function TableMethodCodeBlock(props: TableMethodGeneratorOptions) {
	let script = generate(props)

	const onClickCopy = () => {
		navigator.clipboard.writeText(script)
	}

	return (
		<div>
			<SyntaxHighlighter language="csharp" style={vs2015}>
				{script}
			</SyntaxHighlighter>
			<button onClick={onClickCopy}>Copy code!</button>
		</div>
	)
}


export default TableMethodCodeBlock
