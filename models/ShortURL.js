
/*!

  Mongoose Model:
    - ShortURL

 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ShortURLSchema = new Schema({
  id          : ObjectId,
  URL         : String,
  hash        : { type : String, unique: true },
  hits        : { type : Number, default: 0 },
  created_at  : { type : Date, default: Date.now }
});

var ShortURL = mongoose.model('ShortURL', ShortURLSchema);

module.exports = ShortURL;

/* EOF */