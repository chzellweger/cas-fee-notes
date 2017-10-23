/* global Handlebars */

export default class TemplateStorage {
  constructor(routes) {
    this._routes = routes
    
    this._templatesCache = {}
  }
  _fetchTemplate() {
    const hash = window.location.hash

    const templateToFetch = this._routes(hash)

    if(this._templatesCache[hash]) {
      return this._templatesCache[hash]
    }

    return fetch(`templates/${templateToFetch}.hbs`)
      .then(res => res.text())
      .then(template => Handlebars.compile(template))
      .then(templateFunction => {
        this._templatesCache[hash] = templateFunction
        return templateFunction
      })
      .catch(e => { throw new Error(e) })
  }
  async getTemplate(callback) {
    let templateFunction = await this._fetchTemplate()
    callback(templateFunction)
  }
}