export default function CommonButton({ children, func }: { children: React.ReactNode, func: () => void }) {
	return (
		<button 
			className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
			onClick={func}
		>
			{ children }
		</button>
	)
}
