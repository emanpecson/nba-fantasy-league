import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/connect";

const dbName = String(process.env.DB_NAME);
const collectionName = 'cards';

export async function GET(request: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db(dbName);
		const cards = await db.collection(collectionName).find({}).toArray();

		console.log('Success:', cards);
		return NextResponse.json({ cards }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}

export async function POST(request: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db(dbName);

		const data: Array<Object> = await request.json();
		console.log(data);
		const card = await db.collection(collectionName).insertMany(data);

		console.log('Success:', card);
		return NextResponse.json({ card }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}
