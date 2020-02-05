const vm = require("vm")
const babelUnifyer = require("../index.js")

;(async function () {
  const buffer = await babelUnifyer(__dirname + "/a", {presets: ["@babel/env", "minify"]})
  console.log(JSON.stringify(buffer.toString()))
  const script = new vm.Script(buffer)
  const ctx = vm.createContext({ console })
  await script.runInContext(ctx)
})()
