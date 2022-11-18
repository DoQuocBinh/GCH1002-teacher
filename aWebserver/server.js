var http = require('http')

var server = http.createServer(function(req,res){
    if(req.url == '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write('<h1>home page</h1>')
        res.write('<a href="/student">Student page</a>')
        res.write('<br><a href="/getData">Get data</a>')
    }else if(req.url=='/student'){
        res.write('student page')
    }else if (req.url == '/getData') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({person:{name:"Linh",age:22}}));  
        res.end();  
    }
    else{
        res.write('page not found')
    }
    res.end()
})

const PORT = 5000
server.listen(PORT)
console.log("Server is running")