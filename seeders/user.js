import database from "../config/mongodb.js";
import { hashPassword } from "../helpers/bcrypt.js";
import data from "../data/user.json" assert { type: "json" };

async function seeding() {
  const userDB = database.collection("user");
  const users = data;
  const newUsers = users.map((user) => {
    user.password = hashPassword(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  });
  await userDB.insertMany(newUsers);
}
seeding();
