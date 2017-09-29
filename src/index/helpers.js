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

  return {
    getQueryStringAsObject,
    getQueryVariable
  }
})(window)
