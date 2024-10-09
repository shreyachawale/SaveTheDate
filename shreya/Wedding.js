
const bcrypt = require("bcryptjs");
const Messages = require("../constants/Messages");
const TryCatch = require("../helper/TryCatch");
const { ObjectId } = require('mongodb');
const weddingsCollection = require("../db").db().collection("wedding");

let Wedding = function (data) {
  this.data = data;
  this.errors = [];
};

Wedding.prototype.cleanUp = function () {
  // get rid of any bogus properties
  this.data = {
      
groomName: this.data.groomName,
brideName: this.data.brideName,
tickets: this.data.tickets,
ticektPrice: this.data.ticektPrice,
preWeddingImages: this.data.preWeddingImages,
ourStory: this.data.ourStory,
languages: this.data.languages,
menu: this.data.menu,
alchohol: this.data.alchohol,
transportation: this.data.transportation,
accomodation: this.data.accomodation,
day1: this.data.day1,
day2: this.data.day2,

//predfined start
    createdAt: new Date(),
//predefined end
  };
};

Wedding.prototype.createWedding = async function(){
  this.cleanUp()
  const weddingDoc = await weddingsCollection.insertOne(this.data);
  return weddingDoc
}
              
Wedding.prototype.getById = async function (id){
  let weddingDoc = await weddingsCollection.findOne({_id: new ObjectId(id)})
  return weddingDoc
}

Wedding.prototype.getAllWeddings = async function (){
  let weddingDoc = await weddingsCollection.find({}).toArray()
  return weddingDoc
}

Wedding.prototype.deleteById = async function (id){
  await weddingsCollection.deleteOne({_id: new ObjectId(id)})
  return 
}

module.exports = Wedding;             
