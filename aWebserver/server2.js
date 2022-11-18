var express = require('express')
var fs = require('fs')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/readFile',(req,res)=>{
    
})
app.post('/register',(req,res)=>{
    const name = req.body.txtName
    const country = req.body.country
    const content = name + ";" +country
    fs.writeFileSync("data.txt",content)
    res.render('confirm',{'name':name,'country':country})
})

app.get('/',function (req,res){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    let n = date.toLocaleDateString('vi-VN',options)
    console.log(n);

    res.render('home',{now:n})
})

app.get('/student',(req,res)=>{
    res.render('student')
})

const PORT = 5000
app.listen(PORT)
console.log("Server is running")