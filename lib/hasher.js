
/**
 * @method hasher
 * @description:
 * @param {String} URL URL to be hashed
 * @returns {String} 6 byte hashed representation of the URL
 **/

var hasher = exports.hasher = function(URL, length) {
  if (!length) length = 6;
  var AUID = [],
      CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (var i = 0; i < length; i++) {
    AUID.push(CHARS[Math.floor(Math.random()*62)]);
  }
  return AUID.join('');
};
