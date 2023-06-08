'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

// the configs are contingent to whether the user selects:
// fantasy or simulation mode
export default function NewLeague() {
	const [ftsyMode, setFtsyMode] = useState(false);
	const [simMode, setSimMode] = useState(false);
	const router = useRouter();
	const params = useParams();

	const showFtsyConfigs = () => {
		setFtsyMode(true);
		setSimMode(false);
	}

	const showSimConfigs = () => {
		setSimMode(true);
		setFtsyMode(false);
	}

	function handleButton() {
		console.log('routing...');
		router.push(`${params.userId}/draft`);
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

			<button onClick={handleButton}>
				temp draft route
			</button>
		</div>
	)
}