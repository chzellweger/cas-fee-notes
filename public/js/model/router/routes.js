export default function routesParser(hash) {
  switch(hash) {
    case '#main': return 'text-template'
    case '#edit': return 'text-form-template'
    case '#add': return 'text-form-template'
    default: return '404-template'
  }
}

