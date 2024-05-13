const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: { type: String },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
