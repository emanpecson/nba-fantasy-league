import { NextResponse } from 'next/server';

// export async function GET(type: string) {
// 	let res

// 	switch(type) {
// 		case 'seasons':
// 			res = await fetch('https://api-nba-v1.p.rapidapi.com/seasons', {
// 				method: 'GET',
// 				headers: {
// 					'X-RapidAPI-Key': process.env.RAPID_API_KEY,
// 					'X-RapidAPI-Host': process.env.RAPID_API_HOST
// 				},
// 			});
// 		break;
// 	}

// 	const data = await res.json();
	
// 	console.log(NextResponse.json({ data }));
// 	return NextResponse.json({ data });
// }