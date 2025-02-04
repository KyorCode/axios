'use strict';

var utils = require('../utils');
var toFormData = require('./toFormData');
var platform = require('../platform/');

module.exports = function toURLEncodedForm(data) {
  return toFormData(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  });
};
