var express = require('express')
var app = express()
const crypto = require("crypto")
var fs = require('fs')


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/search',(req,res)=>{
    const name =req.body.txtName
    var employeeList = []
    readDataFile(employeeList)
    const ds = employeeList.filter((value,index,ary)=>{
        return value.name.toUpperCase().includes(name.toUpperCase()) 
    })
    res.render('view',{'ds':ds})
})

app.post('/edit',(req,res)=>{
    const id = req.body.id
    const name =req.body.txtName
    const country = req.body.country
    var employeeList = []
    readDataFile(employeeList)
    const ds = employeeList.filter((value,index,ary)=>{
        return value.id == id
    })
    ds[0].name = name
    ds[0].country = country
    writeDataToFile(employeeList)
    res.redirect("/all")
})

app.get('/edit',(req,res)=>{
    const id = req.query.id
    var employeeList = []
    readDataFile(employeeList)
    const ds = employeeList.filter((value,index,ary)=>{
        return value.id == id
    })
    res.render('edit',{"emp":ds[0]})
})

app.get('/delete',(req,res)=>{
    const id = req.query.id
    var employeeList = []
    readDataFile(employeeList)
    const ds = employeeList.filter((value,index,ary)=>{
        return value.id != id
    })
    writeDataToFile(ds)
    res.redirect("/all")
})

app.get('/all',(req,res)=>{
    var employeeList = []
    readDataFile(employeeList)
    res.render('view',{'ds':employeeList})
})

const fileName = 'data.txt'
app.post('/new',(req,res)=>{
    const uuid = crypto.randomUUID()
    const name = req.body.txtName
    const country = req.body.country
    if(name.trim().length==0){
        res.render("new",{'errorMsg':'Khong de trang!'})
        return
    }
    const content = uuid + ';' + name+ ';' + country + '\n'

    fs.appendFileSync(fileName,content)
    res.redirect('/')

})
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('new')
})

const PORT = 3000
app.listen(PORT)
console.log("Server is running!")

function readDataFile(employeeList) {
    const fileContent = fs.readFileSync(fileName, "utf-8").trim()
    const ary = fileContent.split("\n")
    ary.forEach(element => {
        const e = element.split(";")
        const emp = {
            'id': e[0],
            'name': e[1],
            'country': e[2]
        }
        employeeList.push(emp)
    })
}
function writeDataToFile(ds){
    var content = ""
    ds.forEach(element => {
        content += element.id + ";" + element.name + ";" + element.country + "\n"
    });
    fs.writeFileSync(fileName,content)
}
