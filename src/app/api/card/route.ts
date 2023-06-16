import { NextRequest, NextResponse } from "next/server";
import { Card, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		const query = {
			searchBy: req.nextUrl.searchParams.get('searchBy'),
			searchInput: req.nextUrl.searchParams.get('searchInput'),
			position: req.nextUrl.searchParams.get('position'),
		}
		console.log('query:', query);

		// get cards by search filter
		if(query.searchBy && query.searchInput) {
			if(query.searchBy === 'name') {
				const cards = await prisma.card.findMany({
					where: { name: { contains: query.searchInput } },
				});

				return NextResponse.json({ cards }, { status: 200 });
			}
			else if(query.searchBy === 'team') {
				const cards = await prisma.card.findMany({
					where: { team: { startsWith: query.searchInput } },
				});

				return NextResponse.json({ cards }, { status: 200 });
			}
		}

		// get cards by position
		else if(query.position) {
			const cards = await prisma.card.findMany({
				where: { position: query.position },
			});

			return NextResponse.json({ cards }, { status: 200 });
		}
		
		// get all cards
		else {
			const cards = await prisma.card.findMany({});
	
			console.log('got cards');
			return NextResponse.json({ cards }, { status: 200 });
		}
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const cards: Card[] = await req.json();
		console.log(cards);
		const createdCards = await prisma.card.createMany({
			data: cards,
		})

		console.log('Success:', createdCards);
		return NextResponse.json({ createdCards }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}

// may need some typa security arg to prevent delete access from public
export async function DELETE() {
	try {
		const res = await prisma.card.deleteMany({})

		console.log('Success:', res); 
		return NextResponse.json(null, { status: 200 }) // correct status code? 204?
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json('Server Error', { status: 500 });
	}
}