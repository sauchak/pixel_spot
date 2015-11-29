var _ = require('lodash');

var localEnvVars = {
  TITLE:      'Pixel Spot',
  SAFE_TITLE: 'pixel_spot'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
