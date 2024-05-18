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

    if (user && bcrypt.compareSync(formData.get("password"), user.password)) {
      return Response.json({ message: "success" });
    } else {
      return Response.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  } finally {
    await client.close();
  }
}
