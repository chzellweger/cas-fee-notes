;(function() {
  'use strict'
  const items = localStorage.notes
    ? JSON.parse(localStorage.getItem('notes'))
    : []

  const note = getQueryStringAsObject()

  if (note) {
    note.id = new Date().getTime()
    note.importance = note.importance || 1

    items.push(note)
    localStorage.setItem('notes', JSON.stringify(items))
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
})()
