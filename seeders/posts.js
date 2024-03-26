import database from "../config/mongodb";

async function seeding() {
  const postsDB = database.collection("posts");
  const posts = require("./data/posts.json");
  const newPosts = posts.map((post) => {
    post.createdAt = new Date();
    post.updatedAt = new Date();
  });
  await postsDB.insertMany(newPosts);
}
seeding();
