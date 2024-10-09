 
const Messages = require("../constants/Messages");
  const JsonResponse = require("../helper/JsonResponse");
  const TryCatch = require("../helper/TryCatch");
  const Wedding = require("../models/Wedding");
const jwt = require("jsonwebtoken");

exports.createWedding = async function(req, res){
  let wedding = new Wedding(req.body)
 let weddingDoc = await wedding.createWedding();
 new JsonResponse(req, res).jsonSuccess(weddingDoc, "Created")
}

exports.getById = async function (req, res) {
  let wedding = new Wedding ()
let weddingDoc = await wedding.getById(req.params.id)
new JsonResponse(req, res).jsonSuccess(weddingDoc, new Messages().SUCCESSFULLY_RECEIVED)

}


exports.getAllWeddings = async function (req, res) {
  let wedding = new Wedding ()
let weddings = await wedding.getAllWeddings()
new JsonResponse(req, res).jsonSuccess(weddings, new Messages().SUCCESSFULLY_RECEIVED)
return weddings
}

exports.deleteById = async function (req, res) {
  let wedding = new Wedding ();
await wedding.deleteById()
new JsonResponse(req, res).jsonSuccess(true, new Messages().SUCCESSFULLY_DELETED)
}
    