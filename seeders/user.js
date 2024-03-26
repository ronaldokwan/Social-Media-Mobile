import database from "../config/mongodb";
import { hashPassword } from "bcrypt";

async function seeding() {
  const userDB = database.collection("user");
  const users = require("./data/users.json");
  const newUsers = users.map((user) => {
    user.password = hashPassword(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });
  await userDB.insertMany(newUsers);
}
seeding();
