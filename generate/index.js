const path = require('path');
const fs = require('fs-extra');
const createIconComponent = require('./Icon.js');
const convert = require('./convert.js');

/**
 * 
 * https: //github.com/marella/material-design-icons
 * download this repo and copy the svg folder and past it in root dir
 */

const start = async () => {

   const srcPath = path.join(__dirname, `../src`);
   const exists = await fs.pathExists(srcPath);
   if (exists) {
      await fs.remove(srcPath);
   }
   await fs.ensureDir(srcPath)
   await createIconComponent()
   await convert()
}

start()