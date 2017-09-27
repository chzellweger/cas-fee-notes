'use strict'
;(function() {
  // implement number of items
  const items = localStorage.notes
    ? JSON.parse(localStorage.getItem('notes'))
    : []

  const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

  const count = document.getElementById('count')
  count.innerText = `${items.length} ${postFix}`

  // setup style-changing-functionality
  helpers.initStyleChanger()
  helpers.initStyleListener()

})()
