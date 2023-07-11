import Modal from "../Modal";
import { Card } from "@prisma/client";

export default function CardProfile({
	card,
	isOpen,
	setIsOpen
}: {
	card: Card | undefined;
	isOpen: boolean;
	setIsOpen: (flag: boolean) => void
}) {
	return (
		<Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
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
		</Modal>
	);
}
