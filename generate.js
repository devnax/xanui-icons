const path = require('path');
const fs = require('fs');
const HTMLParser = require('node-html-parser')

/**
 * 
 * https: //github.com/marella/material-design-icons
 * download this repo and copy the svg folder and past it in root dir
 */


const convert = async (dirname) => {
    const directory = path.join(__dirname, `node_modules/@material-design-icons/svg/${dirname}`)
    const outputDirectory = path.join(__dirname, `src/${dirname}`)

    fs.readdir(directory, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            let compName = file.replace('.svg', '').split("_").map(f => f.charAt(0).toUpperCase() + f.slice(1)).join("")
            compName = "Icon" + compName

            let content = fs.readFileSync(directory + `/${file}`).toString()
            var parsed = HTMLParser.parse(content);
            const svg = parsed.querySelector("svg")
            let html = svg.innerHTML.replaceAll("xlink:href", "xlinkHref")
            const component = `import React from 'react'
import Icon, { IconProps } from '../Icon'
export default function ${compName}(props: IconProps){
    return <Icon {...props}>${html}</Icon>
}
`;

            !fs.existsSync(outputDirectory) && fs.mkdirSync(outputDirectory)
            fs.writeFileSync(outputDirectory + `/${compName}.tsx`, component)
        });
    });
}


const start = async () => {

    const component = `import React, { forwardRef } from 'react';
import { Tag, TagProps } from '@xanui/core';
export type IconProps = TagProps<"svg">
const Icon = forwardRef(({ children, ...rest }: IconProps, ref: React.Ref<any>) => {
    const sp:any = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill:"currentColor"
    }
    return (
        <Tag 
            component="svg"
            {...rest}
            {...sp}
            baseClass='svg-icon'
            sxr={{
                fontSize: 24,
                userSelect: "none",
                width: "1em",
                height: "1em",
                display: "inline-block",
                verticalAlign: "middle",
            }}
            ref={ref}
        >{children}</Tag>
    )
})
export default Icon;
`;
    const outputDirectory = path.join(__dirname, `src/`);
    !fs.existsSync(outputDirectory) && fs.mkdirSync(outputDirectory);
    fs.writeFileSync(outputDirectory + `/Icon.tsx`, component)

    const dirs = ["filled", "outlined", "round", "sharp", "two-tone"]
    for (let dir of dirs) {
        await convert(dir)
    }
}

start()