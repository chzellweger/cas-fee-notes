const helpers = (function(window) {
  const _styleChanger = document.getElementById('select-style')

  const initStyleChanger = function() {
    _styleChanger.addEventListener('change', function(e) {
      localStorage.setItem('style', JSON.stringify(e.target.value))
      document.body.className = e.target.value
    })
  }

  const initStyleListener = function() {
    window.addEventListener('DOMContentLoaded', function() {
      const style = JSON.parse(localStorage.getItem('style'))
      document.body.className = style
      if (_styleChanger) _styleChanger.value = style
    })
  }

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

  const getItems = function(key) {
    return localStorage.notes ? JSON.parse(localStorage.getItem(key)) : []
  }

  return {
    initStyleChanger,
    initStyleListener,
    getQueryStringAsObject,
    getItems
  }
})(window)
