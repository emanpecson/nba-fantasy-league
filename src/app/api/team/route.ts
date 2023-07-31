import { Team, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const team: Team = await req.json();
		const data = await prisma.team.create({ data: team });

		console.log('Team posted:', data);
		return NextResponse.json({ data }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}
