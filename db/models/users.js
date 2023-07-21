import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  mail: String,
  password: String,
  favorites: [{ coffee: String, rating: Number }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
