'use client';

import React, { useState } from 'react';

// the configs are contingent to whether the user selects:
// fantasy or simulation mode
export default function newLeague() {
	// const [mode, setMode] = useState('');
	const [ftsyMode, setFtsyMode] = useState(false);
	const [simMode, setSimMode] = useState(false);

	const showFtsyConfigs = () => {
		setFtsyMode(true);
		setSimMode(false);
	}

	const showSimConfigs = () => {
		setSimMode(true);
		setFtsyMode(false);
	}

	return(
		<div>
			<p>Select Mode</p>

			<div>
				<button type="button" onClick={showFtsyConfigs} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Fantasy
				</button>
			</div>
			<div>
				<button type="button" onClick={showSimConfigs} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Simulation
				</button>
			</div>

			{ ftsyMode && (
				"ftsy mode"
			)}

			{ simMode && (
				"sim mode"
			) }
		</div>
	)
}