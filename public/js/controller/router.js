/* global Handlebars */

export default class Router {
  constructor(parent, hook, routes) {
    this.parent = parent
    this.routes = routes
    this.hook = hook
    this.templatesCache = {}
  }
  init() {
    console.log('init router')
    if (!window.location.hash) {
      window.location.hash = '#main'
    }

    window.addEventListener('hashchange', () => {
      this.route(window.location.hash)
    })

    this.route(window.location.hash)
  }
  render() {
    console.log('render in router')
    this.parent.render(this.templatesCache[window.location.hash])
  }
  _loadTemplate(route) {
    console.log('load template')
    const template = this.routes(route)

    if (this.templatesCache[route]) {
      this.render()
      return
    }

    fetch(`templates/${template}.hbs`)
      .then(res => res.text())
      .then(res => {
        this.templatesCache[route] = Handlebars.compile(res)
        return res
      })
      .then(res => {
        this.render()
        return res
      })
      .catch(e => {
        throw new Error(e)
      })
  }
  route(hash) {
    console.log('route')
    this._loadTemplate(hash)
  }
}
