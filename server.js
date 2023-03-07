require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/auth");
const app = express();

app.use(express.json());

// database


const posts = [
  {
    userId: 1,
    post: "post henry",
  },
  {
    userId: 2,
    post: "post khoi",
  },
  {
    userId: 2,
    post: "post khoi 2",
  },
  {
    userId: 2,
    post: "post khoi 3",
  },
];

// app
app.get("/posts", verifyToken, (req, res) => {
  res.json(posts.filter((post) => post.userId === req.userId));
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
