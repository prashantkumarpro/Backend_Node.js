import mongoose from "mongoose";

try {
  await mongoose.connect(
    // "mongodb://admin:admin@localhost:27017/todoApps?authSource=admin"
    "mongodb://Padmin:Padmin@127.0.0.1:27017/todoApps?authSource=admin&replicaSet=myReplicaSet"
  );
  console.log("Database connected");
} catch (err) {
  console.log(err);
  process.exit(1);
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Client Disconnected!");
  process.exit(0);
});
