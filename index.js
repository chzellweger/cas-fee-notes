const serve = require('serve')

const server = serve(__dirname + '/src/', {
  port: 8888,
  ignore: ['node_modules']
})