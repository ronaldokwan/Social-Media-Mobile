import database from "../config/mongodb";

async function seeding() {
  const followDB = database.collection("follow");
  const follows = require("./data/follow.json");
  const newFollow = follows.map((follow) => {
    follow.createdAt = new Date();
    follow.updatedAt = new Date();
  });
  await followDB.insertMany(newFollow);
}
seeding();
