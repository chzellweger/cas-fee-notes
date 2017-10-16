/* global Handlebars */
export default class Router {
  constructor(parent, hook, routes) {
    this.parent = parent
    this.routes = routes
    this.hook = hook
    this.templatesCache = {}
  }
  init() {
    if (!window.location.hash) {
      window.location.hash = '#main'
    }

    window.addEventListener('hashchange', () => {
      this.route(window.location.hash)
    })

    this.route(window.location.hash)
  }
  render() {
    this.parent.render(this.templatesCache[window.location.hash])
  }
  _loadTemplate(route) {
    const template = this.routes(route)

    if (this.templatesCache[route]) {
      console.log('cached value: ')
      console.log(this.templatesCache[route])
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
        throw new Error(console.trace(e))
      })
  }
  route(hash) {
    console.log(hash)
    this._loadTemplate(hash)
  }
}
