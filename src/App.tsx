import React, { useState } from 'react';
import './App.css';
import TableMethodCode from './TableMethodCode';

export interface TableDefinition {
	names?: string[]
	fields?: (string|undefined)[]
	widths?: (number|undefined)[]
	alighments?: ("left"|"right")[]
}

function App() {
	let data = {
		method_name: "PrintLocations",
		empty_message: "Nėra",

		container_type: "LocationsContainer",
		entry_name: "l",
		entry_type: "Location",

		definition: {
			names: ["Miestas", "Atsakingas", "Vardas", "Adresas", "Metai"],
			fields: ["City", "Manager", "Name", "Address", "Year"],
			widths: [10, 20, 18, 15, 5]
		}
	};

  return (
    <div className="App">
			{TableMethodCode(data)}
			<main>
			</main>
    </div>
  );
}

export default App;
