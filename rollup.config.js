import hmr from 'rollup-plugin-hot'
import postcss from 'rollup-plugin-postcss-hot'
// import path from "path"


const hot = hmr({
  public: 'build',
  clearConsole: false,
  inMemory: true,
  open: 'chrome',
  openPort: 5000,
})


// const format = process.env.NOLLUP ? 'esm' : 'iife'
const format = 'esm'


const main = {
    input: 'src/js/game.js',

    output: {
        dir: 'build',
        file: 'build/js/bundle.js',
        format,
        compact: true,
        sourcemap: true,
    },

    inlineDynamicImports: true,
    treeshake: true,

    plugins: [postcss(), hot],

    watch: {
        clearScreen: false,
    },
}


export default [
    main,
]
