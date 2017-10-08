/* eslint no-unused-vars: "off" */

const helpers = (function(window) {
  const getQueryStringAsObject = function() {
    let queryString = window.location.search.substring(1)
    if (queryString.length === 0) return null

    let queryElements = queryString.split('&')

    return queryElements.reduce((object, queryPair) => {
      const keyValue = queryPair.split('=')

      object[keyValue[0]] = decodeURIComponent(keyValue[1]).replace(/\+/g, ' ')
      return object
    }, {})
  }

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1)
    const vars = query.split('&')

    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] === variable) {
        return pair[1]
      }
    }
    return false
  }

  function handlebarsRepeatHelper(n, options) {
    const isNum = !isNaN(n)

    if (!isNum) {
      options = n
      n = 0
    }

    options = options || {}
    const opts = Object.assign({ count: n }, options, options.hash)
    const ctx = this.context
      ? Object.assign({}, this.context, opts)
      : Object.assign({}, this, opts)

    if (opts.count) {
      return block(ctx)
    }

    return options.inverse(ctx)
  }

  function block(options) {
    const max = options.count
    let str = ''

    const start = options.start || 0

    for (var i = start; i < max + start; i++) {
      var data = Object.assign({ index: i }, options)
      str += options.fn(options, { data: data })
    }
    return str
  }
  function $querySelector(selector) {
    return document.querySelector(selector)
  }

  return {
    $querySelector,
    getQueryStringAsObject,
    getQueryVariable,
    handlebarsRepeatHelper
  }
})(window)
