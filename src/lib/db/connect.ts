// import mongoose from 'mongoose';

// const connection = {};

// export default async function dbConnect() {
// 	if(connection.isConnected) {
// 		return;
// 	}

// 	const db = await mongoose.connect(String(process.env.MONGODB_URI), {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});

// 	connection.isConnected = db.connections[0].readyState;
// 	console.log(connection.isConnected);
// }

import { MongoClient } from 'mongodb';

const options = {}; // what is this doing

let client = new MongoClient(String(process.env.MONGODB_URI), options);
let clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;