var express =require('express')
var app= express()

app.set('view engine','hbs')

const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.get('/login',(req,res)=>{
    res.render('login')
})
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'
async function login(user,pass){
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    let userDB = await db.collection("websiteUsers").
            findOne({$and:[{userName:user},{password:pass}]})
     console.log(user)
    return userDB
}
app.use(express.urlencoded({extended:true}))
app.post('/user', async (req,res)=>{
    const user = await login(req.body.username,req.body.password)
    if(user){
        let session=req.session;
        session.userid=user.userName
        session.role = user.role
        console.log(req.session)
        res.redirect('/')
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/',(req,res)=>{
    session=req.session
    res.render('home',{'userid':session.userid,'role':session.role})
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server is running on: ", PORT)
})