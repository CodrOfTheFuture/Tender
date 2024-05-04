const http = require('http')
const port = 3000
const server = http.createServer(function(req, res)  { 
  res.write('Test, you can change this later')
   res.end()
})

server.listen(port, function(error)  {
 if (error) {
    console.log('Sorry! Something went wrong.', error)
 } else {
    console.log ('Server is listening on port' + port)
 }
})