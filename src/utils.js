const jwt = require("jsonwebtoken");
const APP_SECRET = process.env.APP_SECRET;
const bcrypt = require("bcryptjs");

const hashPassword = password => bcrypt.hash(password, 10);

const sign = userId => jwt.sign({ userId }, APP_SECRET);

const comparePassword = (pass1, pass2) => bcrypt.compare(pass1, pass2);

module.exports = { hashPassword, sign, comparePassword };
