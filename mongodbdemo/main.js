const { ObjectId } = require('bson')
var expesss = require('express')
var app = expesss()

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

app.set('view engine','hbs')
app.use(expesss.urlencoded({extended:true}))

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    await db.collection("products").deleteOne({_id:ObjectId(id)})
    res.redirect('/all')
})

app.get('/all',async (req,res)=>{
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    let results = await db.collection("products").find().toArray()
    console.log(results)
    res.render('allProduct',{results:results})
})

app.post('/new',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picUrl = req.body.txtPic
    const newProduct = {
        name :name,
        price: Number.parseFloat(price),
        picture: picUrl
    }
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    let id = await db.collection("products").insertOne(newProduct)
    console.log(id)
    res.render('home')

})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running!")

