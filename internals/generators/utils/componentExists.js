/**
 * componentExists
 *
 * Check whether the given component exist in either the components or pages directory
 */

const fs = require('fs');
const path = require('path');
const componentsList = fs.readdirSync(
  path.join(__dirname, '../../../app/common'),
);
const pagesList = fs.readdirSync(
  path.join(__dirname, '../../../app/pages'),
);
const components = componentsList.concat(pagesList);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
