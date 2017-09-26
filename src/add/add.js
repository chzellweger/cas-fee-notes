
;(function() {
  'use strict'

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

  try {
    var dateValue =
      decodeURIComponent(getQueryVariable('finishby').replace(/\+/g, '%20')) ||
      ''
    var titleValue =
      decodeURIComponent(getQueryVariable('title').replace(/\+/g, '%20')) || ''
    var importanceValue =
      decodeURIComponent(
        getQueryVariable('importance').replace(/\+/g, '%20')
      ) || ''
    var contentValue =
      decodeURIComponent(getQueryVariable('content').replace(/\+/g, '%20')) ||
      ''

    const items = localStorage.notes
      ? JSON.parse(localStorage.getItem('notes'))
      : []

    const note = {
      date: dateValue,
      title: titleValue,
      importance: importanceValue,
      note: contentValue,
      id: items.length + Math.round(Math.random() * 100)
    }
    
    items.push(note)

    localStorage.setItem('notes', JSON.stringify(items))

    let title = document.getElementById('title')
    title.value = titleValue

    let content = document.getElementById('content')
    content.value = contentValue

    let importance = Array.from(document.getElementsByName('importance'))
      .find(el => el.value === importanceValue.toString())
    importance.checked = true

    let date = document.getElementById('date')
    date.value = dateValue
  } catch (error) {
    console.log(error)
  }
})()

