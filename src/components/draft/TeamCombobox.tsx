import { Dispatch, SetStateAction, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { XMarkIcon, TrophyIcon } from '@heroicons/react/24/outline'

interface TeamOption {
	abbreviation: string;
	city: string;
	name: string;
}

const teamOptions = [
	{ abbreviation: 'ATL', city: 'Atlanta', name: 'Hawks' },
	{ abbreviation: 'BOS', city: 'Boston', name: 'Celtics' },
	{ abbreviation: 'BKN', city: 'Brooklyn', name: 'Nets' },
	{ abbreviation: 'CHA', city: 'Charlotte', name: 'Hornets' },
	{ abbreviation: 'CHI', city: 'Chicago', name: 'Bulls' },
	{ abbreviation: 'CLE', city: 'Cleveland', name: 'Cavaliers' },
	{ abbreviation: 'DAL', city: 'Dallas', name: 'Mavericks' },
	{ abbreviation: 'DEN', city: 'Denver', name: 'Nuggets' },
	{ abbreviation: 'DET', city: 'Detroit', name: 'Pistons' },
	{ abbreviation: 'GSW', city: 'Golden State', name: 'Warriors' },
	{ abbreviation: 'HOU', city: 'Houston', name: 'Rockets' },
	{ abbreviation: 'IND', city: 'Indiana', name: 'Pacers' },
	{ abbreviation: 'LAC', city: 'Los Angeles', name: 'Clippers' },
	{ abbreviation: 'LAL', city: 'Los Angeles', name: 'Lakers' },
	{ abbreviation: 'MEM', city: 'Memphis', name: 'Grizzlies' },
	{ abbreviation: 'MIA', city: 'Miami', name: 'Heat' },
	{ abbreviation: 'MIL', city: 'Milwaukee', name: 'Bucks' },
	{ abbreviation: 'MIN', city: 'Minnesota', name: 'Timberwolves' },
	{ abbreviation: 'NOP', city: 'New Orleans', name: 'Pelicans' },
	{ abbreviation: 'NYK', city: 'New York', name: 'Knicks' },
	{ abbreviation: 'OKC', city: 'Oklahoma City', name: 'Thunder' },
	{ abbreviation: 'ORL', city: 'Orlando', name: 'Magic' },
	{ abbreviation: 'PHI', city: 'Philadelphia', name: '76ers' },
	{ abbreviation: 'PHX', city: 'Phoenix', name: 'Suns' },
	{ abbreviation: 'POR', city: 'Portland', name: 'Trail Blazers' },
	{ abbreviation: 'SAC', city: 'Sacramento', name: 'Kings' },
	{ abbreviation: 'SAS', city: 'San Antonio', name: 'Spurs' },
	{ abbreviation: 'TOR', city: 'Toronto', name: 'Raptors' },
	{ abbreviation: 'UTA', city: 'Utah', name: 'Jazz' },
	{ abbreviation: 'WAS', city: 'Washington', name: 'Wizards' },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TeamCombobox({
	setTeam,
}: {
	setTeam: Dispatch<SetStateAction<string>>,
}) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<TeamOption | null>(null);

	async function handleSelect(team: TeamOption) {
		setSelected(team);
		setTeam(team.abbreviation);
	}

	async function resetSelect() {
		setSelected(null);
		setTeam('');
	}

  const filteredOptions =
    query === ''
      ? teamOptions
      : teamOptions.filter((team) => {
          return team.abbreviation.toLowerCase().includes(query.toLowerCase())
							|| team.city.toLowerCase().includes(query.toLowerCase())
							|| team.name.toLowerCase().includes(query.toLowerCase());
        })

  return (
    <Combobox as="div" value={selected} onChange={handleSelect}>
      <div className="relative mt-2">
				{ selected && 
					<button onClick={resetSelect} className="absolute left-2.5 top-2.5">
						<XMarkIcon className="h-4 w-4"/>
					</button>
				}
				{ !selected && 
					<div className="absolute left-2.5 top-2.5">
						<TrophyIcon className="h-4 w-4"/>
					</div>
				}
        <Combobox.Input
          className="w-full pl-9 rounded-md border-0 bg-white py-1.5 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(ev) => setQuery(ev.target.value)}
          displayValue={() => { return selected ? `${selected.city} ${selected.name}` : '' }}
					placeholder='Filter team'
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((team) => (
              <Combobox.Option
                key={team.abbreviation}
                value={team}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames('truncate', selected && 'font-semibold')}>{`${team.city} ${team.name}`}</span>
                      <span
                        className={classNames(
                          'ml-2 truncate text-gray-500',
                          active ? 'text-indigo-200' : 'text-gray-500'
                        )}
                      >
                        {team.abbreviation}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
