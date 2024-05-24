const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()
const uri = process.env.ATLAS_URI
const client = new MongoClient(uri)
let PORT = process.env.PORT || 3500
let connectedClient, db 
async function connectToMongoDB(){
    try {
        connectedClient = await client.connect()
        console.log('Server connected to MongoDB!')
    } catch(error) {
        console.log(error)
    } finally {
        db = connectedClient.db('DBconnectionTest')
        app.listen(PORT, ()=>{
            console.log(`Server is now listening on port: ${PORT}`)
        })
    }
}
connectToMongoDB()
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req,res)=>{
    db.collection('test').find().toArray()
    .then(data=>{
        res.render('index.ejs',{info:data})
    })
    // res.send(`Mongo DB Atlas now connected to server listening on port: ${PORT}`)
})