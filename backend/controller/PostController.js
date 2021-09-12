const Post = require("../models/Post");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { exec } = require("child_process");
/*
| Create a new post
| /api/v1/posts/store
| @Http post
*/
exports.store = catchAsyncErrors(async (req, res) => {
  const { desc } = req.body;
  console.log(req.user._id);
  const storePost = new Post({
    user: req.user._id,
    desc,
    likes: [],
  });
  await storePost.save((error, data) => {
    if (error) {
      return res.status(400).json({
        msg: "Something went wrong!",
        err: error.message,
      });
    }
    if (data) {
      return res.status(200).json({
        msg: "Post has been created !",
        post: data,
      });
    }
  });
});

/*
| Update the post
| /api/v1/posts/:id
| @Http put
*/
exports.update = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (req.user._id.toString() == post.user.toString()) {
    await post.updateOne({ $set: req.body });
    res.status(200).json({
      msg: "Post has been updated !",
    });
  } else {
    res.status(422).json({
      msg: "You can't update this post!1",
    });
  }
});

/*
| Delete the post
| /api/v1/posts/:id
| @Http delete
*/
exports.deletePost = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (req.user._id.toString() == post.user.toString()) {
    await post.deleteOne();
    res.status(200).json({
      msg: "Post has been delete !",
    });
  } else {
    res.status(422).json({
      msg: "You can delete your own post only!",
    });
  }
});

/*
| Like/Dislike the post
| /api/v1/posts/:id/like
| @Http put
*/
exports.likePost = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.likes.includes(req.user._id)) {
    // dislike
    await post.updateOne({ $pull: { likes: req.user._id } });
    res.status(200).json({
      msg: "Post has been disliked !",
    });
  } else {
    // like
    await post.updateOne({ $push: { likes: req.user._id } });
    res.status(200).json({
      msg: "Post has been liked !",
    });
  }
});

/*
| get a post
| /api/v1/posts/:id
| @Http get
*/
exports.getPost = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post) {
    res.status(200).json({
      msg: "Success !",
      post,
    });
  } else {
    res.status(200).json({
      msg: "Invalied post id !",
    });
  }
});

/*
| get timeline post
| /api/v1/posts/timeline
| @Http get
*/
exports.timeline = catchAsyncErrors(async (req, res) => {
  const currentUser = req.user;
  // const timelinePost = await Post.find({ user: currentUser._id });
  // console.log(timelinePost);
  const targetUser = currentUser.followings;
  targetUser.push(currentUser._id);
  console.log(targetUser);
  const timelinePost = await Promise.all(
    targetUser.map((userId) => {
      return Post.find({ user: userId }).sort({ createdAt: -1 });
    })
  );

  res.status(200).json({
    msg: "Success !",
    timeline: timelinePost,
  });
});
