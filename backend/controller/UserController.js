const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");

// const crypto = require("crypto");
// const { exec } = require("child_process");

/*
| Register User
| /api/v1/users/register
| @Http post
*/
exports.register = catchAsyncErrors(async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    profile,
    contact,
    followings,
    followers,
  } = req.body;

  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(422).json({
        message: "User already exist",
      });
    }
    const createUser = new User({
      username,
      firstName,
      lastName,
      email,
      contact,
      password,
      profile,
      followings: [],
      followers: [],
    });
    createUser.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
          err: error.message,
        });
      }
      if (data) {
        const { password, updatedAt, ...other } = data._doc;
        return res.status(200).json({
          message: "User has been created !",
          user: other,
        });
      }
    });
  });
});

/*
| Login User
| /api/v1/users/login
| @Http post
*/
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter a valid email and password"),
      400
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // check is password correct or not
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

/*
| Update user profile
| /api/v1/users/:id
| @Http put
*/
exports.update = catchAsyncErrors(async (req, res) => {
  if (req.user._id == req.params.id || req.user.role == "admin") {
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ msg: "Acount has been updateed" });
  } else {
    res.status(401).json({ msg: "You can not update this acount" });
  }
});

/*
| Delete user
| /api/v1/users/:id
| @Http delete
*/
exports.deleteUser = catchAsyncErrors(async (req, res) => {
  if (req.user._id == req.params.id || req.user.role == "admin") {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "Acount has been deleted!" });
  } else {
    res.status(401).json({ msg: "You can delete only your acount !" });
  }
});

/*
| Get user
| /api/v1/users/:id
| @Http get
*/
exports.getUser = catchAsyncErrors(async (req, res) => {
  if (req.params.id) {
    const user = await User.findById(req.params.id).select([
      "-password",
      "-updatedAt",
    ]);
    res.status(200).json({ msg: "Success!", user });
  } else {
    res.status(400).json({ msg: "User id is required !" });
  }
});

/*
| Follow user
| /api/v1/users/:id/follow
| @Http put
*/
exports.follow = catchAsyncErrors(async (req, res, next) => {
  if (req.user._id == req.params.id) {
    res.status(403).json({ msg: "You can't follow your self !" });
  } else {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (!user.followers.includes(currentUser._id)) {
      await user.updateOne({ $push: { followers: currentUser._id } });
      await currentUser.updateOne({ $push: { followings: user._id } });
      res.status(200).json({ msg: "User has been followed !" });
    } else {
      res.status(422).json({ msg: "You already follow this user !" });
    }
  }
});

/*
| Unfollow user
| /api/v1/users/:id/unfollow
| @Http put
*/
exports.unfollow = catchAsyncErrors(async (req, res, next) => {
  if (req.user._id == req.params.id) {
    res.status(403).json({ msg: "You can't unfollow your self !" });
  } else {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (user.followers.includes(currentUser._id)) {
      await user.updateOne({ $pull: { followers: currentUser._id } });
      await currentUser.updateOne({ $pull: { followings: user._id } });
      res.status(200).json({ msg: "User has been unfollowed !" });
    } else {
      res.status(422).json({ msg: "You don't follow this user !" });
    }
  }
});
