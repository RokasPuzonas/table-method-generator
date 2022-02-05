import './App.css';
import TableMethodCodeBlock from './TableMethodCodeBlock';
import { TableDefinition } from './TableMethodGenerator';
import TableRenderer from './TableRenderer';

function App() {
	let definition: TableDefinition = {
		names: ["Miestas", "Atsakingas", "Vardas", "Adresas", "Metai"],
		fields: ["City", "Manager", "Name", "Address", "Year"],
		widths: [10, 20, 18, 15, 5],
		alignments: ["left", "left", "left", "left", "right"]
	}

	let data = {
		method_name: "PrintLocations",
		empty_message: "Nėra",

		container_type: "LocationsContainer",
		entry_name: "l",
		entry_type: "Location",

		definition
	};

	let test_entries = [
		["Alytus", "AlytausMuziejusA", "Jonas Jonaitis", "GatveA", "1999"],
		["Alytus", "AlytausMuziejusB", "Ona Onaite", "GatveB", "2018"],
		["Kaunas", "KaunasMuziejusC", "Jonas Jonaitis", "GatveC", "2004"],
		["Klaipėda", "KlaipėdaMuziejusD", "Ona Onaite", "GatveD", "1988"],
	];

  return (
    <div className="App">
			<main>
				<hr />
				{TableMethodCodeBlock(data)}
				<hr />
				<TableRenderer definition={definition} entries={test_entries} />
			</main>
    </div>
  );
}

export default App;
