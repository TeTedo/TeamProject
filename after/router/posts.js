const express = require("express");
const router = express.Router();
const { MainPost, MainComment, MainPostLike, Follow } = require("../model");
const getUserInfo = require("../functions/getUserInfo");
const loginCheck = require("../middleware/loginCheck");

router.get("/posts/:postId", loginCheck, async (req, res) => {
  const post_id = req.params.postId;
  const postData = await MainPost.findOne({
    where: { id: post_id },
    raw: true,
  });
  let { user_id, nick_name, profile_img } = await getUserInfo(req, res);
  profile_img = "../" + profile_img;
  const commentData = await MainComment.findAll({
    where: { post_id },
    raw: true,
  });
  const likeData = await MainPostLike.findOne({
    where: { post_id, user_id },
  });

  //팔로잉 팔로우 데이터 넘기기
  let following_id;
  let follower_id;
  await Follow.findOne({
    where: { follower_id: user_id, following_id: postData.user_id },
    raw: true,
  })
    .then((result) => {
      if (result) {
        following_id = result.following_id;
        follower_id = result.follower_id;
      } else {
        following_id = "";
        follower_id = "";
      }
    })
    .catch((err) => {
      following_id = "";
      follower_id = "";
    });

  res.render("posts/posts", {
    user_id,
    nick_name,
    profile_img,
    postData,
    commentData,
    likeData,
    following_id,
    follower_id,
  });
});

module.exports = router;
