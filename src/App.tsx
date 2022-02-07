import { useState } from 'react';
import './App.css';
import TableDefinitionForm from './TableDefinitionForm';
import TableMethodCodeBlock from './TableMethodCodeBlock';
import { TableColumns } from './TableMethodGenerator';

function App() {
	let [columns, setColumns] = useState<TableColumns>([
		{
			name: "Miestas",
			field: "City",
			width: 10,
			alignment: "left"
		},
		{
			name: "Atsakingas",
			field: "Manager",
			width: 20,
			alignment: "left"
		},
		{
			name: "Vardas",
			field: "Name",
			width: 18,
			alignment: "left"
		},
		{
			name: "Address",
			field: "Adress",
			width: 15,
			alignment: "left"
		},
		{
			name: "Metai",
			field: "Year",
			width: 5,
			alignment: "right"
		}
	])

	// let [generatorOptions, setGeneratorOptions] = useState<TableMethodGeneratorOptions>({});

	const onChange = (e: TableColumns) => {
		columns = e
		setColumns(e)
	}

  return (
    <div className="App">
			<main>
				<TableDefinitionForm value={columns} onChange={onChange} />
				<hr />
				<TableMethodCodeBlock columns={columns}/>
			</main>
    </div>
  );
}

export default App;
