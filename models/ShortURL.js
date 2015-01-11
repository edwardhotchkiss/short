
/**
 * @model ShortURL
 */

var options
  , ShortURLSchema
  , mongoose = require('mongoose')
  , wrapper = require('./prototype.js')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

options = { 
  versionKey : false
};

ShortURLSchema = new Schema({
  id         : { type : ObjectId },
  URL        : { type : String, unique: false },
  hash       : { type : String, unique: true },
  hits       : { type : Number, default: 0 },
  data       : { type : Schema.Types.Mixed },
  created_at : { type : Date, default: Date.now },
}, options);

exports.ShortURL = new wrapper.Model(mongoose.model('ShortURL', ShortURLSchema));
