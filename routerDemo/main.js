var express = require('express')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

var customerRouter = require('./customerRouter')
app.use("/customer",customerRouter)

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server is running at: ",PORT)
})
