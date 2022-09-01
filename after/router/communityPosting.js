const express = require("express");
const fs = require("fs");
const router = express.Router();
const getUserInfo = require("../functions/getUserInfo");
const loginCheck = require("../middleware/loginCheck");
const imgUpload = require("../middleware/communityImgUpload");
const { User, CommunityPost } = require("../model");

router.get("/posting/:game_name", loginCheck, async (req, res) => {
    const game_name = req.params.game_name;
    const { user_id, nick_name, profile_img } = await getUserInfo(req, res);
    res.render("communityPosting/communityPosting", {
        game_name,
        user_id,
        nick_name,
        profile_img,
    });
});

fs.readdir("views/uploadsImg/community", err => {
    if (err) {
        fs.mkdirSync("views/uploadsImg/community");
    }
});

router.post(
    "/posting/community/create",
    loginCheck,
    imgUpload.fields([
        { name: "files1" },
        { name: "files2" },
        { name: "files3" },
        { name: "files4" },
        { name: "files5" },
    ]),
    async (req, res) => {
        const { user_id } = await getUserInfo(req, res);
        const { game_name, text, hashtag_values } = req.body;
        const files = Object.values(req.files);

        // 이미지 없는자리 null 로 표시
        if (files.length < 5) {
            for (let i = files.length; i < 5; i++) {
                files[i] = [{ path: null }];
            }
        }

        //path 바꿔주기
        for (let i = 0; i < 5; i++) {
            if (files[i][0].path) {
                const file = files[i][0];
                file.path = file.path.replace("views\\", "");
                file.path = file.path.replace("views/", "");
            }
        }

        req.body;
        CommunityPost.create({
            game_name,
            user_id,
            text,
            like: 0,
            comment: 0,
            hashtag_values,
            image1: files[0][0].path,
            image2: files[1][0].path,
            image3: files[2][0].path,
            image4: files[3][0].path,
            image5: files[4][0].path,
        }).then(() => res.redirect(`/community/${game_name}`));
    }
);

module.exports = router;
