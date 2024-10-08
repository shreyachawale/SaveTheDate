const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "MPRPROJECT", {
    expiresIn: maxAge,
  });
};
const handlErrors = (err) => {
  let errors = { email: "", password: "" };
  console.log(err);
  if (err.code === 11000) {
    errors.email = "email is already registered";
    return errors;
  }
  if(err.message==='incorrect email'){
    errors.email="that is not a registered email:("
  }
  if(err.message==='incorrect password'){
    errors.password="that is not a registered password:("
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
module.exports.register = async (req, res, next) => {
  try {
    
    const{email,password}=req.body
    const user = await User.create( {email, password });
    const token = createToken(user._id);
    console.log(token)
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
   
  } catch (err) {
    
    console.log("error occured in authcontroller.js " + err);
    const errors = handlErrors(err);
    res.json({ errors, created: false });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.login(email, password );
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {

    console.log("error occured in authcontroller.js " + err);
    const errors = handlErrors(err);
    res.json({ errors, created: false });
  }
};

