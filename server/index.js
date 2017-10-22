const http = require('http')
// const url = require('url')
// const fs = require('fs')
// const path = require('path')

// const baseDirectory = '../public'

const PORT = 3005

http.createServer(function(req, res) {
 res.writeHead(200)
 res.end()

}).listen(PORT, 'localhost')

console.log('server running on localhost:' + PORT)
