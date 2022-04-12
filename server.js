const express = require("express");
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const port = 3000;

const fs = require("fs");
let rawdata = fs.readFileSync("users.json");
const users = JSON.parse(rawdata);

const findUserById = (id) =>
  users.find((user) => user.id == id || user.email === id);

app.get("/users", (req, res) => {
  let pageSize = parseInt(req.query.size);
  if (!pageSize) {
    pageSize = 10;
  }

  const pageCount = Math.ceil(users.length / pageSize);

  let page = parseInt(req.query.page);

  if (!page) {
    page = 1;
  }

  if (page > pageCount) {
    page = pageCount;
  }

  res.json({
    page: page,
    pageCount: pageCount,
    posts: users.slice(page * pageSize - pageSize, page * pageSize),
  });
});

app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({
      error: 404,
      message: "User not found",
    });
  }

  res.json(user);
});

app.put(
  "/users/:id/credit",
  body("amount")
    .isInt({ gt: 0 })
    .withMessage("`amount` field must be non-negative number")
    .notEmpty()
    .withMessage("`amount` field is required"),
  body("operation")
    .notEmpty()
    .withMessage("`operation` field is required")
    .isIn(["increase", "decrease"])
    .withMessage(
      "`operation` field must be one of these values: [increase, decrease]"
    ),
  (req, res) => {
    const user = findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 404,
        message: "User not found",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const amount = req.body.amount
    if (req.body.operation === 'decrease') {
      if (amount > user.credit) {
        return res.status(422).json({
          error: 422,
          message: "User's credit is not enough for the operation",
        });
      }

      user.credit -= amount
    } else {
      user.credit += amount
    }

    return res.status(204).send();
  }
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
