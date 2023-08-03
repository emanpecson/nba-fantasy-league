import { League, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const query = {
		id: req.nextUrl.searchParams.get('id')
	}

	try {
		if(query.id) {
			const data = await prisma.league.findUnique({
				where: {
					id: query.id,
				}
			});

			return NextResponse.json({ data }, { status: 200 });
		}
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const league: League = await req.json();
		const data = await prisma.league.create({ data: league });

		console.log('League posted:', data);
		return NextResponse.json({ data }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}
