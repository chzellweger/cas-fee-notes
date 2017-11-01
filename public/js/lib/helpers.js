/* eslint no-unused-vars: "off" */

export function handlebarsRepeatHelper(n, options) {
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

export function block(options) {
  const max = options.count
  let str = ''

  const start = options.start || 0

  for (var i = start; i < max + start; i++) {
    var data = Object.assign({ index: i }, options)
    str += options.fn(options, { data: data })
  }
  return str
}

export function $querySelector(selector) {
  return document.querySelector(selector)
}

export function $querySelectorAll(selector) {
  return document.querySelectorAll(selector)
}

export function formatDay(day, prefix = '', postfix = '') {
  const ENUM_DAYS = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag'
  ]

  return `${prefix} ${ENUM_DAYS[day]} ${postfix}`
}
