const jwt = require("jsonwebtoken");
const JsonResponse = require('./JsonResponse');

exports.verifyToken = function (req, res, next) {
  try{
    const bearerToken = req.headers["authorization"];

    const bearer = bearerToken.split(" ");

    const token = bearer[1];

    console.log(token);

    req.apiUser = jwt.verify(token, process.env.JWTSECRET);
    console.log(req.apiUser)  
    next()
  } catch(error){
console.log("here")
    res.locals.data = {
        isVaild: false, 
        authorizationFailed: true,
      };

      res.locals.message = error;
      new JsonResponse(req, res).jsonError();
      // next(error)
      // return true
  }
};
        