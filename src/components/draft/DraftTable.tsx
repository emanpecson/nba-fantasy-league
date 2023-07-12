import { Card } from "@prisma/client"
import { useState } from "react";
import CardModal from "./CardModal";
import Roster from "@/models/Roster";

export default function DraftTable({
	playerCards,
	isLoading,
	roster,
	setRoster,
}: {
	playerCards: Card[];
	isLoading: boolean;
	roster: Roster;
	setRoster: (roster: Roster) => void;
}) {
	const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
	const [cardProfile, setCardProfile] = useState<Card | null>(null);

	const loadingRows: JSX.Element[] = [];
	for(let i = 0; i < 6; i++) {
		loadingRows.push(
			<tr key={i} className="animate-pulse bg-slate-100 sm:rounded-lg">
				<td className="py-7 pl-4 pr-3 sm:pl-6 lg:pl-8"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
				<td className="px-3 py-7"></td>
			</tr>
		)
	}

	function handleRowClick(card: Card) {
		setCardProfile(card);
		setCardModalIsOpen(true);
	}

  return (
		<div className="pt-4">
			<div className="px-4 sm:px-6 lg:px-8 h-96 overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white">
				<div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle">
						<table className="min-w-full divide-y divide-gray-300 relative">
							<thead>
								<tr>
									<th className="sticky top-0 bg-white opacity-90 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Name</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fantasy</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Points</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assists</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rebounds</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Steals</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Blocks</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Turnovers</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Team</th>
									<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{ !isLoading && playerCards.map((card: Card) => (
									<tr key={card.id} onClick={() => handleRowClick(card)} className="cursor-pointer hover:bg-gray-50">
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{ card.name }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.fantasyPpg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.ppg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.apg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.rpg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.spg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.bpg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.tpg }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.team ? card.team : 'N/A' }</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ card.position }</td>
									</tr>
								)) }
								{ isLoading && loadingRows }
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<CardModal card={cardProfile} cardModalIsOpen={cardModalIsOpen} setCardModalIsOpen={setCardModalIsOpen} roster={roster} setRoster={setRoster} />
    </div>
  )
}
