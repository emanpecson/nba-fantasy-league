import { useState } from "react";
import CommonButton from "../CommonButton";
import Modal from "../Modal";
import { Card } from "@prisma/client";
import Roster from "@/models/Roster";
import Notification from "../Notification";
import getErrorMessage from "@/lib/getErrorMessage";

export default function CardModal({
	card,
	cardModalIsOpen,
	setCardModalIsOpen,
	roster,
	setRoster,
}: {
	card: Card | null;
	cardModalIsOpen: boolean;
	setCardModalIsOpen: (flag: boolean) => void;
	roster: Roster;
	setRoster: (roster: Roster) => void;
}) {
	const [rosterModalIsOpen, setRosterModalIsOpen] = useState(false);
	const [notificationIsOpen, setNotificationIsOpen] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');

	function addToRoster(isStarting: boolean, assignedPosition: string) {
		if(card) {
			// copy as new arr to avoid using same address,
			// otherwise, would not react to change properly
			const rosterTemp = {...roster};

			const rosterSpotOpen = (rosterSpot: Card | null) => {
				if(!rosterSpot)
					return true;
				throw Error('Roster spot taken');
			}

			try {
				if(isStarting) {
					if(assignedPosition === 'pg' && card.position.includes('G')) {
						if(rosterSpotOpen(rosterTemp.starters.pg)) rosterTemp.starters.pg = card;
					} else if(assignedPosition === 'sg' && card.position.includes('G')) {
						if(rosterSpotOpen(rosterTemp.starters.sg)) rosterTemp.starters.sg = card;
					} else if(assignedPosition === 'sf' && card.position.includes('F')) {
						if(rosterSpotOpen(rosterTemp.starters.sf)) rosterTemp.starters.sf = card;
					} else if(assignedPosition === 'pf' && card.position.includes('F')) {
						if(rosterSpotOpen(rosterTemp.starters.pf)) rosterTemp.starters.pf = card;
					} else if(assignedPosition === 'c' && card.position.includes('C')) {
						if(rosterSpotOpen(rosterTemp.starters.c)) rosterTemp.starters.c = card;
					} else {
						throw Error('Invalid selection');
					}
				} else {
					if(assignedPosition === 'pg' && card.position.includes('G')) {
						if(rosterSpotOpen(rosterTemp.bench.pg)) rosterTemp.bench.pg = card;
					} else if(assignedPosition === 'sg' && card.position.includes('G')) {
						if(rosterSpotOpen(rosterTemp.bench.sg)) rosterTemp.bench.sg = card;
					} else if(assignedPosition === 'sf' && card.position.includes('F')) {
						if(rosterSpotOpen(rosterTemp.bench.sf)) rosterTemp.bench.sf = card;
					} else if(assignedPosition === 'pf' && card.position.includes('F')) {
						if(rosterSpotOpen(rosterTemp.bench.pf)) rosterTemp.bench.pf = card;
					} else if(assignedPosition === 'c' && card.position.includes('C')) {
						if(rosterSpotOpen(rosterTemp.bench.c)) rosterTemp.bench.c = card;
					} else {
						throw Error('Invalid selection');
					}
				}
			} catch(error) {
				setNotificationMessage(getErrorMessage(error));
				setNotificationIsOpen(true);
			}

			setRoster(rosterTemp);
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
					<div className="flex">
						<div className="flex-row space-x-3">
							<p>starting:</p>
							<button onClick={() => { addToRoster(true, 'pg'); setRosterModalIsOpen(false); }}>pg</button>
							<button onClick={() => { addToRoster(true, 'sg'); setRosterModalIsOpen(false); }}>sg</button>
							<button onClick={() => { addToRoster(true, 'sf'); setRosterModalIsOpen(false); }}>sf</button>
							<button onClick={() => { addToRoster(true, 'pf'); setRosterModalIsOpen(false); }}>pf</button>
							<button onClick={() => { addToRoster(true, 'c'); setRosterModalIsOpen(false); }}>c</button>
						</div>
						<div className="flex-row space-x-3">
							<p>bench:</p>
							<button onClick={() => { addToRoster(false, 'pg'); setRosterModalIsOpen(false); }}>pg</button>
							<button onClick={() => { addToRoster(false, 'sg'); setRosterModalIsOpen(false); }}>sg</button>
							<button onClick={() => { addToRoster(false, 'sf'); setRosterModalIsOpen(false); }}>sf</button>
							<button onClick={() => { addToRoster(false, 'pf'); setRosterModalIsOpen(false); }}>pf</button>
							<button onClick={() => { addToRoster(false, 'c'); setRosterModalIsOpen(false); }}>c</button>
						</div>
					</div>
				</Modal>
			}
			
			<Notification isOpen={notificationIsOpen} onClose={() => setNotificationIsOpen(false)} label={'Error'}>
				{ notificationMessage }
			</Notification>
		</div>
	);
}
