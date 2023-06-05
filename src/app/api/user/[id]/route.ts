import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/connect";
import { ObjectId } from "mongodb";

const dbName = String(process.env.DB_NAME); // should this be something i hide?
// const collectionName = String(process.env.COLLECTION_NAME);
const collectionName = 'users';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

	try {
		const client = await clientPromise;
		const userId: string = params.id;
		const db = client.db(dbName);
		const user = await db.collection(collectionName).findOne({
			_id: new ObjectId(userId)
		});

		console.log('Success:', user);
		return NextResponse.json({ user }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}

