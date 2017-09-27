const helpers = (function(window) {
  const styleChanger = document.getElementById('select-style')

  function initStyleChanger() {
    styleChanger.addEventListener('change', function(e) {
      localStorage.setItem('style', JSON.stringify(e.target.value))
      document.body.className = e.target.value
    })
  }

  function initStyleListener() {
    window.addEventListener('DOMContentLoaded', function() {
      const style = JSON.parse(localStorage.getItem('style'))
      document.body.className = style
      if (styleChanger) styleChanger.value = style
    })
  }

  function getQueryStringAsObject() {
    let queryString = window.location.search.substring(1)
    if (queryString.length === 0) return null

    let queryElements = queryString.split('&')

    return queryElements.reduce((object, queryPair) => {
      const keyValue = queryPair.split('=')

      object[keyValue[0]] = decodeURIComponent(keyValue[1]).replace(/\+/g, ' ')
      return object
    }, {})
  }

  return {
    initStyleChanger,
    initStyleListener,
    getQueryStringAsObject
  }
})(window)
