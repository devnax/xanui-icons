const path = require('path');
const fs = require('fs-extra');
const HTMLParser = require('node-html-parser');
const converter = require('number-to-words');
/**
 * 
 * https: //github.com/marella/material-design-icons
 * download this repo and copy the svg folder and past it in root dir
 */

const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
function makeComponentName(filename, dirname) {
   filename = filename.replace(/\.svg$/, "")
   filename = filename.replace(/\d+/g, d => converter.toWords(d) + " ");
   filename = filename.replaceAll("_", " ")
   filename = filename.replaceAll("-", " ")
   filename = filename.split(" ").map(f => ucFirst(f)).join("")
   dirname = dirname.split(" ").map(f => ucFirst(f)).join("")
   return filename + dirname
}

const convert = async () => {
   const dirs = ["filled", "outlined", "round", "sharp", "two-tone"]
   const names = {}
   for (let dirname of dirs) {
      const directory = path.join(__dirname, "../", `node_modules/@material-design-icons/svg/${dirname}`)
      try {
         const files = await fs.readdir(directory, 'utf8');
         for (let file of files) {
            let name = makeComponentName(file, dirname === 'two-tone' ? "" : dirname)
            let key = name.toLowerCase()
            if (names[key]) {
               // name = makeComponentName(file, "One" + ucFirst(dirname))
               continue
            }
            let content = await fs.readFile(directory + `/${file}`, 'utf8')
            var parsed = HTMLParser.parse(content);
            const svg = parsed.querySelector("svg")
            let html = svg.innerHTML.replaceAll("xlink:href", "xlinkHref")

            const component = `import React from 'react'
import Icon, { IconProps } from './Icon'
export default function ${name}(props: IconProps){
    return <Icon {...props}>${html}</Icon>
}
`;
            await fs.outputFile(path.join(__dirname, `../src/${name}.tsx`), component);
            names[key] = `export { default as ${name} } from './${name}'`
         }
      } catch (err) {
         console.error('Error reading file:', err);
      }
   }

   // write index file
   let index = `export { default as Icon } from './Icon'\n`
   index += Object.values(names).join("\n")
   await fs.outputFile(path.join(__dirname, `../src/index.ts`), index);

}

module.exports = convert
