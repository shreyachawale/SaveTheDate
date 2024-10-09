
const express = require('express');
const router = express.Router();
const AuthHelper = require('./helper/JWTAuthHelper');
const TryCatch = require('./helper/TryCatch');
const Messages = require('./constants/Messages');

//imports here

const weddingController = require('./controllers/weddingController');



//Entity - Host --start
//Authentication - Host


//CRUD Operations - Host
// router.get('/host/get-by-id/:id', AuthHelper.verifyToken, new TryCatch(hostController.getById).tryCatchGlobe());
// router.get('/host/get-by-email/:email', AuthHelper.verifyToken, new TryCatch(hostController.getByEmail).tryCatchGlobe());
// router.get('/host/get-all', AuthHelper.verifyToken, new TryCatch(hostController.getAllHosts).tryCatchGlobe());
// router.delete('/host/delete-by-id/:id', AuthHelper.verifyToken, new TryCatch(hostController.deleteById).tryCatchGlobe());
//Entity - Host - End


//Entity - Guest --start
//Authentication - Guest
// router.post('/register-guest', new TryCatch(guestController.apiRegister).tryCatchGlobe());
// router.post('/login-guest', new TryCatch(guestController.apiLogin).tryCatchGlobe());

//CRUD Operations - Guest
// router.post('/guest/does-email-exists', AuthHelper.verifyToken, new TryCatch(guestController.doesEmailExist).tryCatchGlobe());
// router.get('/guest/get-by-id/:id', AuthHelper.verifyToken, new TryCatch(guestController.getById).tryCatchGlobe());
// router.get('/guest/get-by-email/:email', AuthHelper.verifyToken, new TryCatch(guestController.getByEmail).tryCatchGlobe());
// router.get('/guest/get-all', AuthHelper.verifyToken, new TryCatch(guestController.getAllGuests).tryCatchGlobe());
// router.delete('/guest/delete-by-id/:id', AuthHelper.verifyToken, new TryCatch(guestController.deleteById).tryCatchGlobe());
//Entity - Guest - End


//Entity - Wedding --start

//CRUD Operations - Wedding
//Add this in all routes as a middleware //AuthHelper.verifyToken
router.post('/wedding/create', new TryCatch(weddingController.createWedding).tryCatchGlobe());
router.get('/wedding/get-by-id/:id', AuthHelper.verifyToken, new TryCatch(weddingController.getById).tryCatchGlobe());
router.get('/wedding/get-all', new TryCatch(weddingController.getAllWeddings).tryCatchGlobe());
router.delete('/wedding/delete-by-id/:id', AuthHelper.verifyToken, new TryCatch(weddingController.deleteById).tryCatchGlobe());
//Entity - Wedding - End

module.exports = router;
