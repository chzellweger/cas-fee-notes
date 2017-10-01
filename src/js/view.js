'use strict'
const View = (function(Controller) {
  return class View {
    constructor() {
      this._styleChanger = document.getElementById('select-style')
      this._sortButtons = document.getElementsByName('sorting')
      this._toggleShowFinishedButtons = document.getElementById('toggle-finished')
      this._count = document.getElementById('count')
      this._target = document.getElementById('rendered-content')
      this._source =
        document.getElementById('note-template') &&
        document.getElementById('note-template').innerHTML
      this._title = document.getElementById('title')
      this._content = document.getElementById('content')
      this._importance = document.getElementsByName('importance')
      this._finishby = document.getElementById('date')
    }
    init() {
      console.log(this)
      this.initStyleListener()
    }
    initStyleListener() {
      window.addEventListener('DOMContentLoaded', function() {
        console.log('i listen to styles now...')
        const style = controller.getItem('style') || 'day'
        document.body.className = style
        if (_styleChanger) _styleChanger.value = style
      })
    }
    initStyleChanger() {
      _styleChanger.addEventListener('change', function(e) {
        controller.setItem('style', e.target.value)
        document.body.className = e.target.value
      })
    }
  }
})()
  /*
  function View() {
  }

  View.prototype.constructor = View

  View.prototype.init = function() {
    this.initStyleListener()

    // only if we are on the main page:
    // - attach other listeners too
    // - render dynamic content
    if (_styleChanger && _sortButtons && _toggleShowFinishedButton && _count) {
      this.initStyleChanger()
      this.initFinish()
      this.initSort()
      this.initToggleShowFinish()
      this.setCount()

      // initial render
      this.render()
    }
  }

  View.prototype.initStyleListener = function () {
    window.addEventListener('DOMContentLoaded', function() {
      console.log('i listen to styles now...')
      const style = controller.getItem('style') || 'day'
      document.body.className = style
      if (_styleChanger) _styleChanger.value = style
    })
  }

  View.prototype.

  return {
    View
  }
})()
/*
const view = (function(window, document) {
  return function View() {
    this._styleChanger = document.getElementById('select-style')
    this._sortButtons = document.getElementsByName('sorting')
    this._toggleShowFinishedButtons =  document.getElementById('toggle-finished')
    this._count =  document.getElementById('count')
    this._target =  document.getElementById('rendered-content')
    this._source = 
      document.getElementById('note-template') &&
      document.getElementById('note-template').innerHTML
    this._title =  document.getElementById('title')
    this._content = document.getElementById('content')
    this._importance =  document.getElementsByName('importance')
    this._finishby =  document.getElementById('date')
  }
  /*
  const setup = function() {
    return {
      _styleChanger: document.getElementById('select-style'),
      _sortButtons: document.getElementsByName('sorting'),
      _toggleShowFinishedButton: document.getElementById('toggle-finished'),
      _count: document.getElementById('count'),
      _target: document.getElementById('rendered-content'),
      _source:
        document.getElementById('note-template') &&
        document.getElementById('note-template').innerHTML,
      _title: document.getElementById('title'),
      _content: document.getElementById('content'),
      _importance: document.getElementsByName('importance'),
      _finishby: document.getElementById('date')
    }
  }

  const {
    _styleChanger,
    _sortButtons,
    _toggleShowFinishedButton,
    _count,
    _target,
    _source,
    _showFinished,
    _title,
    _content,
    _importance,
    _finishby
  } = setup()

  const init = function() {
    initStyleListener()

    // only if we are on the main page:
    // - attach other listeners too
    // - render dynamic content
    if (_styleChanger && _sortButtons && _toggleShowFinishedButton && _count) {
      initStyleChanger()
      initFinish()
      initSort()
      initToggleShowFinish()
      setCount()

      // initial render
      render()
    }
  }

  const setCount = function() {
    const items = controller.getItems()
    const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

    _count.innerText = `${items.length} ${postFix}`
  }

  const initStyleListener = function() {
    window.addEventListener('DOMContentLoaded', function() {
      const style = controller.getItem('style') || 'day'
      document.body.className = style
      if (_styleChanger) _styleChanger.value = style
    })
  }

  const initStyleChanger = function() {
    _styleChanger.addEventListener('change', function(e) {
      controller.setItem('style', e.target.value)
      document.body.className = e.target.value
    })
  }

  const initFinish = function() {
    const contentList = _target
    contentList.addEventListener('click', function(e) {
      if (e.target && e.target.matches('input[name="finish"]')) {
        controller.markAsFinished(e.target.id)
      }
    })
  }

  const initSort = function() {
    _sortButtons[0].checked = true
    controller.setItem('sort', 'finishby')

    _sortButtons.forEach(button => {
      button.addEventListener('change', function(event) {
        controller.setItem('sort', event.target.value)
      })
    })
  }

  const initToggleShowFinish = function() {
    controller.setItem('filter', false)

    _toggleShowFinishedButton.addEventListener('change', function(e) {
      controller.setItem('filter', _toggleShowFinishedButton.checked)
    })
  }
  
  const fillFields = function(item) {
    _title.value = item.title
    _content.value = item.content
    _finishby.value = item.finishby
    Array.from(_importance).find(el => el.value === item.importance.toString()).checked = true
  }

  const render = function() {
    // get app state
    let items = controller.getItems()

    const template = Handlebars.compile(_source)
    const target = _target

    const showAll = controller.getItem('filter')
    const sortBy = controller.getItem('sort')

    // setup items according to state
    if (!showAll) {
      items = items.filter(item => item.finished !== true)
    }

    if (sortBy === 'finishby') {
      items = items.sort((a, b) => {
        return a[sortBy] > b[sortBy]
      })
    } else {
      items = items.sort((a, b) => {
        return a[sortBy] < b[sortBy]
      })
    }
    

    let content = ''

    items.forEach(item => {
      var context = item
      var html = template(context)
      content += html
    })

    target.innerHTML = content
  }
  
  return {
    init,
    render,
    fillFields
  }
})(window, document)
*/
