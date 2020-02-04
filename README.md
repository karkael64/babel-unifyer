# Babel-Compile

Helps to translate files with Babel.js and compile them in a single script file

## Table of Contents

1. Installation
3. Simple usage
4. Documentation


## Installation

`npm install --save-dev babel-compile`


## Simple usage

```js
const vm = require("vm")
const babelCompile = require("babel-compile")

;(async function () {
  const script = await babelCompile(__dirname + "/a")
  const ctx = vm.createContext({ console })
  await script.runInContext(ctx)
})()
```

## Prepare

With this module, you can load files that are not written in JavaScript. The translated contents are then sent to Babel.js for integration in the compiled script.

```js
const {setTranslator} = require("babel-compile")
setTranslator(".xml", function (contents) {
  // your translation
})
```

For every extensions not listed, you can configure translator `""` for default translation.

## Configure

### Babel

Second parameter is the Babel.js configurator (below default configuration).

```js
const babelCompile = require("babel-compile")
babelCompile(filename, {
  presets: ["@babel/env"],
  ast: true,
  sourceMap: true,
  comments: false
})
```

Warn: `sourceMap` parameter here should be `false` for disabling, or anything else for enabling it.

### Added configuration

In order to help translation of compiled scripts like TypeScript, you can set `allowedExtensions` as an array of filename extensions allowed. Default value is `[".js"]`.

```js
const babelCompile = require("babel-compile")
babelCompile(filename, {
  allowedExtensions: [".js", ".jsx", ".mjs"]
})
```
