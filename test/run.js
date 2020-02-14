const vm = require("vm")
const babelUnifyer = require("../index.js")
const { setTranslator } = babelUnifyer

;(async function () {

  setTranslator(".xml", function (contents, filename, opts) {
    return Promise.resolve(`export default ${JSON.stringify(`<xml bundle="babel-unifyer">\n${contents}</xml>\n`)}`);
  })

  const buffer = await babelUnifyer(__dirname + "/a", {presets: ["@babel/env", "minify"]})

  console.log("Print script unified:", JSON.stringify(buffer.toString()))

  const script = new vm.Script(buffer)
  const ctx = vm.createContext({ console })
  await script.runInContext(ctx)

})().then(() => { process.exit(0) }).catch(() => { process.exit(1) })
