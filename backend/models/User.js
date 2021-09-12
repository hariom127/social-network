const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      trim: true,
      lowercase: true,
      unique: true,
      min: 3,
      max: 20,
    },
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
      trim: true,
      min: 3,
      maxlength: [15, "First name can not exceed 15 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
      trim: true,
      min: 3,
      maxlength: [15, "First name can not exceed 15 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    contact: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      trim: true,
      minlength: [6, "Password must have at least 6 characters"],
      select: false,
    },
    profile: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 100,
    },
    city: {
      type: String,
      max: 100,
    },
    from: {
      type: String,
      max: 100,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Encript Password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare user password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
