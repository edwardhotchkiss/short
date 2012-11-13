
/**
 * @model ShortURL
 **/

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ShortURLSchema = new Schema({
  id         : { type : ObjectId },
  URL        : { type : String },
  qr         : { type : String },
  hash       : { type : String, unique: true },
  hits       : { type : Number, default: 0 },
  created_at : { type : Date, default: Date.now },
  uniques    : { type : Number, default: 0},
  visitors   : { type : [String]},
  data       : { type  : Schema.Types.Mixed }
}, { versionKey: false });

var ShortURL = module.exports = mongoose.model('ShortURL', ShortURLSchema);

/* EOF */