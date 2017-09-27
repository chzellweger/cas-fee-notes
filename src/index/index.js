'use strict'
;(function() {
  // implement number of items
  const items = localStorage.notes
    ? JSON.parse(localStorage.getItem('notes'))
    : []

  const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

  const count = document.getElementById('count')
  count.innerText = `${items.length} ${postFix}`

  // implement style-changer
  const styleChanger = document.getElementById('select-style')
  const body = document.getElementsByTagName('body')[0]

  styleChanger.addEventListener('change', function(e) {
    localStorage.setItem('style', JSON.stringify(e.target.value))
    body.className = e.target.value
  })
})()
