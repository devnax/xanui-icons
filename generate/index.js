import path from 'path';
import fs from 'fs-extra';
import createIconComponent from './Icon.js';
import convert from './convert.js';

/**
 * 
 * https: //github.com/marella/material-design-icons
 * download this repo and copy the svg folder and past it in root dir
 */

const start = async () => {
   const srcPath = path.join("./src");

   const exists = await fs.pathExists(srcPath);
   if (exists) {
      await fs.remove(srcPath);
   }
   await fs.mkdir(srcPath, { recursive: true });
   await createIconComponent();
   await convert();
};

start();