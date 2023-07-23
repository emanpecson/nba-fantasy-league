'use client';

import { useEffect, useState } from 'react';
import DraftTable from '@/components/draft/DraftTable';
import { Card } from '@prisma/client';
import DraftSearch from '@/components/draft/DraftSearch';
import TeamCombobox from '@/components/draft/TeamCombobox';
import PositionSelect from '@/components/draft/PositionSelect';
import RosterView from '@/components/draft/roster/RosterView';
import Roster from '@/models/Roster';
import PickOrder from '@/components/draft/PickOrder';

export default function Draft() {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roster, setRoster] = useState<Roster>({
    starters: { pg: null, sg: null, sf: null, pf: null, c: null },
    bench: { pg: null, sg: null, sf: null, pf: null, c: null },
  });

  useEffect(() => {
    const handleFilter = async () => {
      setIsLoading(true);

      const res = await fetch(
        `/api/card?searchInput=${searchInput}&team=${team}&position=${position}`,
        { method: 'GET' }
      );
      const { cards } = await res.json();
      console.log('filtered cards:', cards);
      setPlayerCards(cards);

      setIsLoading(false);
    };
    handleFilter();
  }, [team, position, searchInput]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/5 pt-2 pl-3">
					<PickOrder />
				</div>

        <div className="basis-4/5 px-3">
          <div className="flex flex-row space-x-1.5">
            <div className="basis-3/5">
              <DraftSearch setSearchInput={setSearchInput} />
            </div>
            <div className="basis-1/5">
              <TeamCombobox setTeam={setTeam} />
            </div>
            <div className="basis-1/5">
              <PositionSelect setPosition={setPosition} />
            </div>
          </div>

					<div>
						<DraftTable
							playerCards={playerCards}
							isLoading={isLoading}
							roster={roster}
							setRoster={setRoster}
						/>
					</div>

					<div>
          	<RosterView roster={roster} />
					</div>
        </div>
      </div>
    </div>
  );
}
