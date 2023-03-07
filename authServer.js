// chuc nang xac nhan nguoi dung khi login
// tra ve token
// xu ly access token het han
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

// database
let users = [
  {
    id: 1,
    username: "henry",
    refreshToken: null,
  },
  {
    id: 2,
    username: "khoi",
    refreshToken: null,
  },
];

// app

const generateToken = (payload) => {
  const { id, username } = payload;

  // Create JWT
  const accessToken = jwt.sign(
    { id, username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );

  const refreshToken = jwt.sign(
    { id, username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { accessToken, refreshToken };
};

const updateRefreshToken = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username) {
      return { ...user, refreshToken };
    }

    return user;
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);

  if (!user) return res.sendStatus(401);

  const tokens = generateToken(user);
  updateRefreshToken(username, tokens.refreshToken);

  console.log(users);

  res.json(tokens);
});

app.post("/token");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
