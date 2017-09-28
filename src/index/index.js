'use strict'
;(function() {
  // implement number of items
  const items = helpers.getItems()

  const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

  const count = document.getElementById('count')
  count.innerText = `${items.length} ${postFix}`

  // setup style-changing-functionality
  helpers.initStyleChanger()
  helpers.initStyleListener()

})()
