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

  function $querySelectorAll(selector) {
    return document.querySelectorAll(selector)
  }

  function formatDay(day, prefix ='', postfix = '') {
    switch (day) {
      case 0:
        return '' + prefix + ' Sonntag' + postfix
      case 1:
        return '' + prefix + ' Montag' + postfix
      case 2:
        return '' + prefix + ' Dienstag' + postfix
      case 3:
        return '' + prefix + ' Mittwoch' + postfix
      case 4:
        return '' + prefix + ' Donnerstag' + postfix
      case 5:
        return '' + prefix + ' Freitag' + postfix
      case 6:
        return '' + prefix + ' Samstag' + postfix
      default:
        return ''
  }}
  return {
    formatDay,
    $querySelector,
    $querySelectorAll,
    getQueryStringAsObject,
    getQueryVariable,
    handlebarsRepeatHelper
  }
})(window)
