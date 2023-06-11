'use client';

import Modal from '@/components/modal';
import LoadLeague from "./loadLeague/page";
import NewLeague from "./newLeague/page";
import { useState } from "react";

export default function Menu() {
	const [isOpenNL, setIsOpenNL] = useState(false);
	const [isOpenLL, setIsOpenLL] = useState(false);

	return (
		<div>
			<div>
				<button onClick={setIsOpenLL(true)}>
					Open Load League
				</button>
				<Modal isOpen={isOpenLL} onClose={setIsOpenLL(false)}>
					<LoadLeague />
				</Modal>
			</div>
			<div>
				<button onClick={setIsOpenNL(true)}>
					Open New League 
				</button>
				<Modal isOpen={isOpenNL} onClose={setIsOpenNL(true)}>
					<NewLeague />
				</Modal>
			</div>

		</div>
	);
}