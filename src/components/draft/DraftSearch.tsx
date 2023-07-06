import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function DraftSearch({
	setSearchInput,
}: {
	setSearchInput: Dispatch<SetStateAction<string>>
}) {
	const [input, setInput] = useState('');
	const debouncedValue = useDebounce(input, 500);

	function resetInput() {
		setInput('');
	}

	useEffect(() => {
		setSearchInput(input);
		console.log('input:', input);
	}, [debouncedValue])

  return (
    <div>
      <div className="mt-2 relative">
				{ input &&
					<button onClick={resetInput} className="absolute left-2.5 top-2.5">
						<XMarkIcon className="h-4 w-4"/>
					</button>
				}
				{ !input &&
					<div className="absolute left-2.5 top-2.5">
						<MagnifyingGlassIcon className="h-4 w-4"/>
					</div>
				}
        <input
					onChange={(ev) => { setInput(ev.target.value) }}
					value={input}
          type="text"
          id="search-bar"
          className="block w-full pl-9 rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Filter player"
        />
      </div>
    </div>
  )
}
