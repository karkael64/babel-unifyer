# Babel-Unifyer

Helps to translate files with Babel.js and unifyer them in a single script file

## Table of Contents

1. Installation
3. Simple usage
4. Documentation


## Installation

`npm install --save-dev babel-unifyer`


## Simple usage

```js
const vm = require("vm")
const babelUnifyer = require("babel-unifyer")

;(async function () {
  const script = await babelUnifyer(__dirname + "/a")
  const ctx = vm.createContext({ console })
  await script.runInContext(ctx)
})()
```

## Configure

### Babel

Second parameter is the Babel.js configurator (below default configuration).

```js
const babelUnifyer = require("babel-unifyer")
babelUnifyer(filename, {
  presets: ["@babel/env"],
  ast: true,
  sourceMap: true,
  comments: false
})
```

Warn: `sourceMap` parameter here should be `false` for disabling, or anything else for enabling it.


### Added configuration

In order to help translation of unified scripts like TypeScript, you can set `allowedExtensions` as an array of filename extensions allowed. Default value is `[".js"]`.

```js
const babelUnifyer = require("babel-unifyer")
babelUnifyer(filename, {
  allowedExtensions: [".js", ".jsx", ".mjs"]
})
```


### Prepare

With this module, you can load files that are not written in JavaScript. The translated contents are then sent to Babel.js for integration in the unified script.

```js
const {setTranslator} = require("babel-unifyer")
setTranslator(".xml", function (contents) {
  // your translation
})
```

For every extensions not listed, you can configure translator `""` for default translation.
