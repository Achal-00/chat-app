const bcrypt = require("bcryptjs");
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db();
    const formData = await request.formData();

    const user = await db
      .collection("user")
      .findOne({ username: formData.get("username") });

    if (user) {
      return Response.json({ message: "User already exists" });
    } else {
      const result = await db.collection("user").insertOne({
        username: formData.get("username"),
        password: bcrypt.hashSync(formData.get("password"), 10),
      });
      return Response.json({ message: "success" });
    }

    console.log(user);
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  } finally {
    await client.close();
  }
}
