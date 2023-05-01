const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")

const usersRoute = require("./users")

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/api/users", usersRoute)

const ConnectDB = async ()=>{
    try {
        mongoose.connect(
            'mongodb://127.0.0.1:27017/Shop',
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log("Connected to database");
        
    } catch (error) {
        console.log("Not connected to database");
    }
    
}

app.get("/", (req, res)=>{
    res.send("Hello")
})

app.listen(3001, ()=>{
    console.log("Status 200 server connected");
        ConnectDB()
})