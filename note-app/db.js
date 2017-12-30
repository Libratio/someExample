var db = require("mongoose");
db.Promise = require('bluebird');
db.connect('mongodb://localhost/note_db', {
    useMongoClient: true
})
var NoteFolder = db.model('note_folder', {
    name: { type: String, default: "" },
    remark: { type: String, default: "" },
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now }
})
var Note = db.model('note', {
    content: { type: String, default: "" },
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
    folder: { type: db.Schema.Types.ObjectId, ref: "note_folder" }
})
var toObject = function(model){
    model = model.toObject();
    model.id = model._id.toString();
    delete model._id;
    delete model.__v;
    return model;
}
var toArray = function(models){
    return models.map(function(model){
        return toObject(model);
    })
}

module.exports = {
    NoteFolder:NoteFolder,
    Note:Note,
    toObject:toObject,
    toArray:toArray
}