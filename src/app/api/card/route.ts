import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const cards = await prisma.card.findMany({});

		console.log('got cards');
		return NextResponse.json({ cards }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const cards: object[] = await req.json();
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