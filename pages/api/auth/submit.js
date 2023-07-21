import dbConnect from "@/db/connect";
import User from "@/db/models/users";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, mail, password } = req.body;
    const existingUser = User.findOne(mail);
    if (existingUser) {
      return res.status(500).json({ status: "User already exists" });
    }

    const hashedPassword = hash(password, 12);

    User.create(name, mail, hashedPassword);
    return res.status(200).json({ status: "New user created" });
  } else {
    throw new Error({ message: "HTTP Method not valid" });
  }
}
