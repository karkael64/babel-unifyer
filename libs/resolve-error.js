module.exports = class ResolveError extends Error {
  addSubError (err) {
    if (err instanceof ResolveError) {
      this.sub.push(err)
    }
  }

  static createCantResolve (fromFile, required) {
    const err = new ResolveError(`Can't resolve ${JSON.stringify(required)} from ${JSON.stringify(fromFile)}`)
    err.fromFile = fromFile
    err.required = required
    return err
  }
}