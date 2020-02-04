const vm = require("vm")
const babelCompile = require("../index.js")

;(async function () {
  const script = await babelCompile(__dirname + "/a")
  const ctx = vm.createContext({ console })
  await script.runInContext(ctx)
})()
