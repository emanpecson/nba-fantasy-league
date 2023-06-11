import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		const { id } = await req.json();

		const user = await prisma.user.findUnique({
			where: {
				id,
			}
		})

		console.log('Success:', user);
		return NextResponse.json({ user }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json('Server Error', { status: 500 });
	}
}
