const { get } = require('./customerRouter')

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

async function getDB() {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    return db
}
async function insertNewCustomer(newCustomer){
    let db = await getDB()
    let id = await db.collection("customers").insertOne(newCustomer)
    return id
}

async function getAllCustomer(){
    let db = await getDB()
    let result = await db.collection("customers").find().toArray()
    return result
}

module.exports = {insertNewCustomer,getAllCustomer}