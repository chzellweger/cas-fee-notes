/* global Handlebars */

import routesParser from './routes.js'

const routes = routesParser

const templatesCache = {}

function _fetchTemplate() {
  const hash = window.location.hash

  const templateToFetch = routes(hash)

  if (templatesCache[hash]) {
    return new Promise(resolve => resolve(templatesCache[hash]))
  }

  return fetch(`templates/${templateToFetch}.hbs`)
    .then(res => res.text())
    .then(template => Handlebars.compile(template))
    .then(templateFunction => {
      templatesCache[hash] = templateFunction
      return templateFunction
    })
    .catch(err => {
      console.log('ERROR: ' + err.code + ' (' + err.message + ')')
    })
}

function getTemplate(callback) {
  _fetchTemplate().then(templateFunction => callback(templateFunction))
}

export default { getTemplate }
