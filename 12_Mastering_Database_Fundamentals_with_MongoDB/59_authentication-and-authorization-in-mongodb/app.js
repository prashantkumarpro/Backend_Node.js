import { MongoClient } from "mongodb";

// const connectionUrl = "mongodb://anurag:anurag@127.0.0.1:27018/storageApp";
const connectionUrl =
  "mongodb://dataDock:dataDock%40108@ec2-3-92-51-247.compute-1.amazonaws.com/dataDock";
  
const client = new MongoClient(connectionUrl);

await client.connect();

const db = client.db();
const collection = db.collection("users");
const data = await collection.find().toArray();

console.log(data);
client.close();
