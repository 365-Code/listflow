import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});

const userModel = mongoose.models.Users || mongoose.model("Users", userSchema);
export default userModel