export default function routesParser(hash) {
  switch(hash) {
    case '#main': return 'main-template'
    case '#edit': return 'form-template'
    case '#add': return 'form-template'
    default: return '404-template'
  }
}