'use client';

import Modal from "./components/modal";
import LoadLeague from "./loadLeague/page";
import NewLeague from "./newLeague/page";
import { useState } from "react";

export default function Menu() {
	const [isOpenNewLeagueModal, setIsOpenNewLeagueModal] = useState(false);
	const [isOpenLoadLeagueModal, setIsOpenLoadLeagueModal] = useState(false);

	const openNewLeagueModal = () => { setIsOpenNewLeagueModal(true); }
	const closeNewLeagueModal = () => { setIsOpenNewLeagueModal(false); }

	const openLoadLeagueModal = () => { setIsOpenLoadLeagueModal(true); }
	const closeLoadLeagueModal = () => { setIsOpenLoadLeagueModal(false); }

	return (
		<div>
			<div>
				<button onClick={openLoadLeagueModal}>
					Open Load League
				</button>
				<Modal isOpen={isOpenLoadLeagueModal} onClose={closeLoadLeagueModal}>
					<LoadLeague />
				</Modal>
			</div>
			<div>
				<button onClick={openNewLeagueModal}>
					Open New League 
				</button>
				<Modal isOpen={isOpenNewLeagueModal} onClose={closeNewLeagueModal}>
					<NewLeague />
				</Modal>
			</div>

		</div>
	);
}