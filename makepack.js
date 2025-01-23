const config = (c) => {
   c.pack.esm.sourcemap = false
   c.pack.cjs.sourcemap = false
   return c
}

module.exports = config