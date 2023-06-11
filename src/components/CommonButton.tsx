'use client';

import { useRouter } from "next/navigation";

export default function CommonButton({ text, func }: { text: string, func: React.FC }) {
	const router = useRouter();

	return (
		<button 
			className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
			onClick={func}
		>
			{ text }
		</button>
	)
}
