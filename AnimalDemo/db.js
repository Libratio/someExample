const db = require("mongoose");

db.connect("mongodb://localhost/animal",{
    useMongoClient:true
})

var Schema = db.Schema;
var type_schema = new Schema({
    name:String,
    description:String
})
var AnimalType = db.model('animal_type',type_schema);

var animal_schema = new Schema({
    name:String,
    description:String,
    type:{
        type:Schema.Types.ObjectId,
        ref:"animal_type"
    },
    remark:String
})
var Animal = db.model('animal',animal_schema)

module.exports = {
    AnimalType:AnimalType,
    Animal:Animal
}