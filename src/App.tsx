import { useState } from 'react';
import './App.css';
import TableDefinitionForm from './TableDefinitionForm';
import TableMethodCodeBlock from './TableMethodCodeBlock';
import { TableDefinition } from './TableMethodGenerator';

function App() {
	let [definition, setDefinition] = useState<TableDefinition>({
		names: ["Miestas", "Atsakingas", "Vardas", "Adresas", "Metai"],
		fields: ["City", "Manager", "Name", "Address", "Year"],
		widths: [10, 20, 18, 15, 5],
		alignments: ["left", "left", "left", "left", "right"]
	})

	let [data, setData] = useState({
		definition
	});

	const onChange = (e: TableDefinition) => {
		definition = e
		data.definition = e
		setDefinition(e)
		setData({...data})
	}

  return (
    <div className="App">
			<main>
				<TableDefinitionForm value={definition} onChange={onChange} />
				<hr />
				{TableMethodCodeBlock(data)}
			</main>
    </div>
  );
}

export default App;
