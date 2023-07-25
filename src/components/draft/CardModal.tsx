import { useState } from "react";
import CommonButton from "../CommonButton";
import Modal from "../Modal";
import { Card } from "@prisma/client";
import Roster from "@/models/Roster";
import Team from "@/models/Team";
// import Notification from "../Notification";
// import getErrorMessage from "@/lib/getErrorMessage";

export default function CardModal({
	card,
	cardModalIsOpen,
	setCardModalIsOpen,
	roster,
	setRoster,
	teams,
	setTeams,
}: {
	card: Card | null;
	cardModalIsOpen: boolean;
	setCardModalIsOpen: (flag: boolean) => void;
	roster: Roster;
	setRoster: (roster: Roster) => void;
	teams: Team[];
	setTeams: (teams: Team[]) => void;
}) {
	const [rosterModalIsOpen, setRosterModalIsOpen] = useState(false);
	// const [notificationIsOpen, setNotificationIsOpen] = useState(false);
	// const [notificationMessage, setNotificationMessage] = useState('');

	function addToRoster(isStarting: boolean, assignedPosition: string) {
		if(card) {
			// copy as new obj to trigger reactivity (avoid using same reference)
			const rosterTemp = {...roster};

			if(isStarting) {
				rosterTemp.starters[assignedPosition as keyof typeof rosterTemp.starters] = card;
			} else {
				rosterTemp.bench[assignedPosition as keyof typeof rosterTemp.bench] = card;
			}

			setRoster(rosterTemp);
			setRosterModalIsOpen(false);
		}
	}

	return (
		<div>
			<Modal onClose={() => setCardModalIsOpen(false)} isOpen={cardModalIsOpen}>
				<div>
					<p>Name: { card?.name }</p>
					<p>Fantasy PPG: { card?.fantasyPpg }</p>
					<p>PPG: { card?.ppg }</p>
					<p>APG: { card?.apg }</p>
					<p>RPG: { card?.rpg }</p>
					<p>FG%: { card?.fgPct }</p>
					<p>3P%: { card?.fg3Pct }</p>
					<p>SPG: { card?.spg }</p>
					<p>BPG: { card?.bpg }</p>
					<p>TPG: { card?.tpg }</p>
					<p>MPG: { card?.mpg }</p>
					<p>Age: { card?.age }</p>
					<p>Position: { card?.position }</p>
					<p>Team: { card?.team ? card.team : 'N/A' }</p>
					<p>Height: { card?.height }</p>
					<p>Weight: { card?.weight }</p>
					<p>Last attended: { card?.lastAttended ? card.lastAttended : 'N/A' }</p>
					<p>Country: { card?.country ? card.country : 'N/A' }</p>
				</div>

				<CommonButton func={() => { setRosterModalIsOpen(true); setCardModalIsOpen(false); }}>Add to roster</CommonButton>
			</Modal>

			{ rosterModalIsOpen &&
				<Modal onClose={() => setRosterModalIsOpen(false)} isOpen={rosterModalIsOpen}>
					<div className="flex space-x-8 font-semibold justify-center">
						<div className="flex-row space-x-3">
							<p>starting:</p>
							<button onClick={() => { addToRoster(true, 'pg') }} disabled={roster.starters.pg != null || !card?.position.includes('G')} className="disabled:text-gray-400">pg</button>
							<button onClick={() => { addToRoster(true, 'sg') }} disabled={roster.starters.sg != null || !card?.position.includes('G')} className="disabled:text-gray-400">sg</button>
							<button onClick={() => { addToRoster(true, 'sf') }} disabled={roster.starters.sf != null || !card?.position.includes('F')} className="disabled:text-gray-400">sf</button>
							<button onClick={() => { addToRoster(true, 'pf') }} disabled={roster.starters.pf != null || !card?.position.includes('F')} className="disabled:text-gray-400">pf</button>
							<button onClick={() => { addToRoster(true, 'c') }} disabled={roster.starters.c != null || !card?.position.includes('C')} className="disabled:text-gray-400">c</button>
						</div>
						<div className="flex-row space-x-3">
							<p>bench:</p>
							<button onClick={() => { addToRoster(false, 'pg') }} disabled={roster.bench.pg != null || !card?.position.includes('G')} className="disabled:text-gray-400">pg</button>
							<button onClick={() => { addToRoster(false, 'sg') }} disabled={roster.bench.sg != null || !card?.position.includes('G')} className="disabled:text-gray-400">sg</button>
							<button onClick={() => { addToRoster(false, 'sf') }} disabled={roster.bench.sf != null || !card?.position.includes('F')} className="disabled:text-gray-400">sf</button>
							<button onClick={() => { addToRoster(false, 'pf') }} disabled={roster.bench.pf != null || !card?.position.includes('F')} className="disabled:text-gray-400">pf</button>
							<button onClick={() => { addToRoster(false, 'c') }} disabled={roster.bench.c != null || !card?.position.includes('C')} className="disabled:text-gray-400">c</button>
						</div>
					</div>
				</Modal>
			}

			{/* <Notification isOpen={notificationIsOpen} onClose={() => setNotificationIsOpen(false)} label={'Error'}>
				{ notificationMessage }
			</Notification> */}
		</div>
	);
}
