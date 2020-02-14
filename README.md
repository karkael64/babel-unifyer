# Babel-Unifyer

Helps to translate files with Babel.js and unifyer them in a __single script file__.

The __required files__ are added in the single script, the __non-js__ files are transformed (if the transformation is registered) or read as strings for then execution of Javascript.

## Table of Contents

1. [Installation](#installation)
2. [Simple usage](#simple-usage)
3. [Configure](#configure)
    1. [Babel](#babel)
    2. [Added configuration](#added-configuration)
    3. [Prepare non-js files](#prepare-non-js-files)
4. [Documentation](#documentation)


## Installation

`npm install --save-dev babel-unifyer`


## Simple usage

```js
const vm = require("vm")
const babelUnifyer = require("babel-unifyer")

;(async function () {
  const buffer = await babelUnifyer(__dirname + "/a")
  const script = new vm.Script(buffer)
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


### Prepare non-js files

With this module, you can load files that are not written in JavaScript. The translated contents are then sent to Babel.js for integration in the unified script.

```js
const {setTranslator} = require("babel-unifyer")
setTranslator(".xml", function (contents) {
  // your translation
  return contents
})
```

For every extensions not listed, you can configure translator `""` for default translation.


## Documentation

#### Load module

```js
const { unifyScript, setTranslator } = require("babel-unifyer")
// or
const unifyScript = require("babel-unifyer")
const { setTranslator } = unifyScript
```


#### function unifyScript(src, opts)

Function unifyScript translate a script entry `src` to an only one executable script with its required files.

Parameters:
 * `{object} opts` the options for the babel translation ;
 * `{string} src` the entry script path.

Returns: `{Promise.<{vm.Script} script>.<{Error} err>}` reject an error if :
 * a file required is not reachable ;
 * there is an error at compilation.


#### function setTranslator(extname, fn)

Set a translator function `fn` for every files with extension name `extname`. Default extension name is `""`.

Parameters:
 * `{string} extname` with dot ;
 * `{function} fn({string} contents, {string} filename, {object} opts) : {string|Buffer|Promise.<{string|Buffer} contents>}` translator.
