import dbConnect from "@/db/connect";
import User from "@/db/models/users";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, mail, password } = req.body;
    const existingUser = await User.findOne({ mail: mail });

    if (existingUser) {
      return res.status(500).json({ status: "User already exists" });
    }

    const hashedPassword = await hash(password, 12);
    try {
      const newUser = {
        name: name,
        mail: mail,
        password: hashedPassword,
      };

      await User.create(newUser);
      return res.status(200).json({ status: "New user created" });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "You are not loggend in!" });
  }
  throw new Error({ message: "HTTP Method not valid" });
}
