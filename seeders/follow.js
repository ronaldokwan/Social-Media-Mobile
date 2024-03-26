import database from "../config/mongodb.js";
import data from "../data/follow.json" assert { type: "json" };

async function seeding() {
  const followDB = database.collection("follow");
  const follows = data;
  const newFollow = follows.map((follow) => {
    follow.createdAt = new Date();
    follow.updatedAt = new Date();
    return follow;
  });
  await followDB.insertMany(newFollow);
}
seeding();
