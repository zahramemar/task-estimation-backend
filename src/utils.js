const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const APP_SECRET = process.env.APP_SECRET;

const hashPassword = password => bcrypt.hash(password, 10);

const sign = userId => jwt.sign({ userId }, APP_SECRET);

const comparePassword = (pass1, pass2) => bcrypt.compare(pass1, pass2);

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = { getUserId, hashPassword, sign, comparePassword };
