const usermodel = require("../models/user-model");
const { comparePass } = require("../utils/decryptpass");
const { hashPass } = require("../utils/encryptPass");
const { jsontoken } = require("../utils/generateToken");
const jwt = require('jsonwebtoken')

const registeruser = async (req, res) => {
  try {
    let { username, email, number, password } = req.body;
    let ifuser = await usermodel.findOne({ email: email });
    if (ifuser) {
      res.send("This email is already registered");
      res.redirect("/");
    }
    const hashedpass = await hashPass(password);
    let user = await usermodel.create({
      username,
      email,
      number,
      password: hashedpass,
    });
    const token = jsontoken(user);
    res.cookie("token", token);
    // res.send("Account created Successfully")
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};

const loginuser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let ifuser = await usermodel.findOne({ email: email });
    if (!ifuser) {
      // res.send("Email or password is incorrect")
      res.redirect("/login");
    } else {
      let user = ifuser;
      let ismatch = await comparePass(password, user.password);
      if (!ismatch) {
        // res.send("Email or password is incorrect")
        res.redirect("/");
      }
      if (ismatch) {
        const token = jsontoken(user);
        res.cookie("token", token);
        res.redirect("/home");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

const logoutuser = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

const isLoggesin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) res.redirect("/login");
    const decode = jwt.verify(token, "irshad");
    req.user = { _id: decode.usermodelid, email: decode.email };
    next();
  } catch (error) {
    console.log(error.message);
    res.redirect("/login");
  }
};

module.exports = { registeruser, loginuser, logoutuser, isLoggesin};
