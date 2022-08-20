const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에 서버열림`);
});

app.use(express.static(__dirname));
const loginNode = require("../router/login.js");
const joinNode = require("../router/join.js");
app.use(loginNode, joinNode);
