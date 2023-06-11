import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const users = await prisma.user.findMany({});

		console.log('Success:', users);
		return NextResponse.json({ users }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();
		const createdUser = await prisma.user.create({
			data: {
				email,
				password,
			}
		})

		console.log('Success:', createdUser);
		return NextResponse.json({ createdUser }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}
