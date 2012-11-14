
/**
 * @model ShortURL
 **/

var mongoose = require('mongoose')
  , wrapper = require('./prototype.js')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ShortURLSchema = new Schema({
  id         : { type : ObjectId },
  URL        : { type : String, unique: true },
  hash       : { type : String, unique: true },
  hits       : { type : Number, default: 0 },
  data       : { type : Schema.Types.Mixed },
  created_at : { type : Date, default: Date.now },
}, { versionKey: false });

var MongooseModel = mongoose.model('ShortURL', ShortURLSchema);

exports.ShortURL = new wrapper.Model(MongooseModel);

/* EOF */