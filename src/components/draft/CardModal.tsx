import { useState } from 'react';
import CommonButton from '../CommonButton';
import Modal from '../Modal';
import { Card } from '@prisma/client';
import Roster from '@/models/Roster';
import fullTeamName from '@/util/constants/fullTeamName';
import toFullPositionName from '@/util/toFullPositionName';
import RosterButton from './roster/RosterButton';

export default function CardModal({
  card,
  cardModalIsOpen,
  setCardModalIsOpen,
  roster,
  setRoster,
  cardPicks,
  setCardPicks,
}: {
  card: Card | null;
  cardModalIsOpen: boolean;
  setCardModalIsOpen: (flag: boolean) => void;
  roster: Roster | null;
  setRoster: (roster: Roster) => void;
  cardPicks: Card[];
  setCardPicks: (cardPicks: Card[]) => void;
}) {
  const [rosterModalIsOpen, setRosterModalIsOpen] = useState(false);

  function addToRoster(isStarting: boolean, assignedPosition: string) {
    if (card) {
      // copy as new obj to trigger reactivity (avoid using same reference)
      const rosterTemp = { ...roster } as Roster;

      if (isStarting) {
        rosterTemp.starters[assignedPosition as keyof typeof rosterTemp.starters] = card;
      } else {
        rosterTemp.bench[assignedPosition as keyof typeof rosterTemp.bench] = card;
      }

      setRoster(rosterTemp);
      setRosterModalIsOpen(false);

      const tempCardPicks: Card[] = [...cardPicks, card];
      setCardPicks(tempCardPicks);
    }
  }

  return (
    <div>
      <Modal onClose={() => setCardModalIsOpen(false)} isOpen={cardModalIsOpen}>
        <div className="pb-2">
          <div className="pb-5">
            <h1 className="text-3xl">{card?.name}</h1>
            <h2 className="flex justify-center space-x-3">
              <p>{card?.team ? fullTeamName[card?.team as string] : 'N/A'}</p>
              <p className="opacity-20">|</p>
              <p>{toFullPositionName(card?.position as string)}</p>
            </h2>
          </div>
          <hr />

          <div className="space-y-3 py-5">
            <div>
              <label className="font-semibold text-sm">Fantasy PPG</label>
              <p>{card?.fantasyPpg}</p>
            </div>
            <div className="flex justify-center">
              <table>
                <thead>
                  <tr>
                    <th className="font-semibold text-sm px-3">PPG</th>
                    <th className="font-semibold text-sm px-3">APG</th>
                    <th className="font-semibold text-sm px-3">RPG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{card?.ppg}</td>
                    <td>{card?.apg}</td>
                    <td>{card?.rpg}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <table>
                <thead>
                  <tr>
                    <th className="font-semibold text-sm px-3">SPG</th>
                    <th className="font-semibold text-sm px-3">BPG</th>
                    <th className="font-semibold text-sm px-3">TPG</th>
                    <th className="font-semibold text-sm px-3">MPG</th>
                    <th className="font-semibold text-sm px-3">FG%</th>
                    <th className="font-semibold text-sm px-3">3P%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{card?.spg}</td>
                    <td>{card?.bpg}</td>
                    <td>{card?.tpg}</td>
                    <td>{card?.mpg}</td>
                    <td>{card?.fgPct}</td>
                    <td>{card?.fg3Pct}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />

          <div className="space-y-3 py-5">
            <div className="flex justify-center">
              <table>
                <thead>
                  <tr>
                    <th className="font-semibold text-sm px-3">Age</th>
                    <th className="font-semibold text-sm px-3">Height</th>
                    <th className="font-semibold text-sm px-3">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{card?.age}</td>
                    <td>{card?.height}</td>
                    <td>{card?.weight}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-center">
              <table>
                <thead>
                  <tr>
                    <th className="font-semibold text-sm px-3">Last attended</th>
                    <th className="font-semibold text-sm px-3">Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{card?.lastAttended ? card.lastAttended : 'N/A'}</td>
                    <td>{card?.country ? card.country : 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <CommonButton
          func={() => {
            setRosterModalIsOpen(true);
            setCardModalIsOpen(false);
          }}>
          Add to roster
        </CommonButton>
      </Modal>

      {rosterModalIsOpen && (
        <Modal onClose={() => setRosterModalIsOpen(false)} isOpen={rosterModalIsOpen}>
          <div className="pb-6">
            <p className="font-semibold text-xl">{card?.name}</p>
            <p className="text-sm">{toFullPositionName(card?.position as string)}</p>
          </div>

          <hr />

          <div className="py-5">
            <p className="pb-4 text-lg">Choose a roster spot</p>
            <div className="flex-row space-x-3 pb-3 space-y-2">
              <p>Starters</p>
              <RosterButton
                func={() => {
                  addToRoster(true, 'pg');
                }}
                isDisabled={roster?.starters.pg != null || !card?.position.includes('G')}>
                PG
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(true, 'sg');
                }}
                isDisabled={roster?.starters.sg != null || !card?.position.includes('G')}>
                SG
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(true, 'sf');
                }}
                isDisabled={roster?.starters.sf != null || !card?.position.includes('F')}>
                SF
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(true, 'pf');
                }}
                isDisabled={roster?.starters.pf != null || !card?.position.includes('F')}>
                PF
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(true, 'c');
                }}
                isDisabled={roster?.starters.c != null || !card?.position.includes('C')}>
                C
              </RosterButton>
            </div>
            <div className="flex-row space-x-3 space-y-2">
              <p>Bench</p>
              <RosterButton
                func={() => {
                  addToRoster(false, 'pg');
                }}
                isDisabled={roster?.bench.pg != null || !card?.position.includes('G')}>
                PG
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(false, 'sg');
                }}
                isDisabled={roster?.bench.sg != null || !card?.position.includes('G')}>
                SG
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(false, 'sf');
                }}
                isDisabled={roster?.bench.sf != null || !card?.position.includes('F')}>
                SF
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(false, 'pf');
                }}
                isDisabled={roster?.bench.pf != null || !card?.position.includes('F')}>
                PF
              </RosterButton>
              <RosterButton
                func={() => {
                  addToRoster(false, 'c');
                }}
                isDisabled={roster?.bench.c != null || !card?.position.includes('C')}>
                C
              </RosterButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
