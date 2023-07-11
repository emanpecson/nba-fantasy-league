import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'

interface PositionOption {
	abbreviation: string;
	full: string;
}

const positionOptions = [
	{ abbreviation: 'G', full: 'Guard' },
	{ abbreviation: 'F', full: 'Forward' },
	{ abbreviation: 'C', full: 'Center' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PositionSelect({
	setPosition,
}: {
	setPosition: Dispatch<SetStateAction<string>>,
}) {
  const [selected, setSelected] = useState<PositionOption | null>(null)

	function handleSelect(position: PositionOption) {
		setSelected(position);
		setPosition(position.abbreviation);
	}

	function resetSelect() {
		setSelected(null);
		setPosition('');
	}

  return (
		<div>
			<Listbox value={selected} onChange={handleSelect}>
				{({ open }) => (
					<>
						<div className="relative mt-2">
							<Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
								{ selected && 
									<button onClick={resetSelect} className="absolute left-2.5 top-2.5">
										<XMarkIcon className="h-4 w-4"/>
									</button>
								}
								{ !selected &&
									<div className="absolute left-2.5 top-2.5">
										<PuzzlePieceIcon className="h-4 w-4"/>
									</div>
								}
								<span className="inline-flex w-full truncate pl-6">
									<span className={ selected ? 'text-black' : 'text-gray-500' }>{selected ? selected.full : 'Filter position' }</span>
									<span className="ml-2 truncate text-gray-500">{selected ? selected.abbreviation : '' }</span>
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{positionOptions.map((position) => (
										<Listbox.Option
											key={position.abbreviation}
											className={({ active }) =>
												classNames(
													active ? 'bg-indigo-600 text-white' : 'text-gray-900',
													'relative cursor-default select-none py-2 pl-3 pr-9'
												)
											}
											value={position}
										>
											{({ selected, active }) => (
												<>
													<div className="flex">
														<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'truncate')}>
															{position.full}
														</span>
														<span className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'ml-2 truncate')}>
															{position.abbreviation}
														</span>
													</div>

													{selected ? (
														<span
															className={classNames(
																active ? 'text-white' : 'text-indigo-600',
																'absolute inset-y-0 right-0 flex items-center pr-4'
															)}
														>
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
  )
}
