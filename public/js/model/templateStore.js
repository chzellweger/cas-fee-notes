/* global Handlebars */

import routesParser from './routes.js'

const routes = routesParser

const templatesCache = {}

function fetchTemplate() {
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
    .catch(e => {
      throw new Error(e)
    })
}

function getTemplate(callback) {
  fetchTemplate().then(templateFunction => callback(templateFunction))
}

export default { getTemplate }
