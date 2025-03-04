const config = (c) => {
   c.build.configs[0].sourcemap = false
   c.build.configs[1].sourcemap = false
   c.build.configs.push({
      entryPoints: ["./src/Icon.js"],
      outdir: "base",
      format: "esm",
      minify: true,
      sourcemap: false,
      target: ["es2020"],
      jsxFactory: "h",
      jsxFragment: "h.Fragment",
   })

   return c
}

module.exports = config