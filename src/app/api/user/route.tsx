import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/connect";

const dbName = String(process.env.DB_NAME);
// const collectionName = String(process.env.COLLECTION_NAME);
const collectionName = 'users';

export async function GET(request: NextRequest) {

	try {
		const client = await clientPromise;
		const db = client.db(dbName);
		const users = await db.collection(collectionName).find({}).toArray();

		console.log('Success:', users);
		return NextResponse.json({ users }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}

export async function POST(request: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db(dbName);
		const { email, password } = await request.json();
		const user = await db.collection(collectionName).insertOne({
			email,
			password
		});

		console.log('Success:', user);
		return NextResponse.json({ user }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}