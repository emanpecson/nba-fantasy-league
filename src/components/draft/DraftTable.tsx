import { Card } from "@prisma/client"
import CardProfile from "./CardProfile"
import { useState } from "react";

export default function DraftTable({ playerCards }: { playerCards: Card[] }) {
	const [isOpenCard, setIsOpenCard] = useState(false);
	const [cardProfile, setCardProfile] = useState<Card>();

	function handleRowClick(card: Card) {
		setCardProfile(card);
		setIsOpenCard(true);
	}

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle h-96">
            <table className="min-w-full divide-y divide-gray-300 overflow-auto relative">
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
                {playerCards.map((card: Card) => (
                  <tr key={card.id} onClick={() => handleRowClick(card)} className="cursor-pointer hover:bg-gray-50">
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{card.name}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.fantasyPpg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.ppg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.apg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.rpg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.spg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.bpg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.tpg}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.team}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
			<CardProfile card={cardProfile} isOpen={isOpenCard} setIsOpen={setIsOpenCard} />
    </div>
  )
}
