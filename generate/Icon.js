const path = require('path');
const fs = require('fs-extra');

const createIconComponent = async () => {
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
    await fs.outputFile(path.join(__dirname, `../src/Icon.tsx`), component);
}

module.exports = createIconComponent