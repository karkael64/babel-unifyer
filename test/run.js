const vm = require("vm")
const babelUnifyer = require("../index.js")

;(async function () {
  const script = await babelUnifyer(__dirname + "/a")
  const ctx = vm.createContext({ console })
  await script.runInContext(ctx)
})()
