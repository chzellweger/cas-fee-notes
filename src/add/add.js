;(function() {
  'use strict'
  const items = localStorage.notes
    ? JSON.parse(localStorage.getItem('notes'))
    : []

  const note = helpers.getQueryStringAsObject()

  if (note) {
    note.id = new Date().getTime()
    note.importance = note.importance || 1
    // note.finishby = new Date(note.finishby).getTime() > new Date().getTime() ? note.finishby : new Date().format("dd-mm-yyyy")
    items.push(note)
    localStorage.setItem('notes', JSON.stringify(items))
  }
  
  // setup style-changing-functionality
  helpers.initStyleListener()
})()
