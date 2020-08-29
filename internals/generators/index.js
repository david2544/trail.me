/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const commonGenerator = require('./common/index.js');
const pageComponentGenerator = require('./pageComponent/index.js');
const pageGenerator = require('./page/index.js');

module.exports = plop => {
  plop.setGenerator('common', commonGenerator);
  plop.setGenerator('pageComponent', pageComponentGenerator);
  plop.setGenerator('page', pageGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../app/pages/${comp}`),
        fs.F_OK,
      );
      return `pages/${comp}`;
    } catch (e) {
      return `common/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.ts*',
    )}`;
    exec(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
}