//Dependencies
let express = require("express");
const res = require("express/lib/response");

let app = express()
let path = require("path");

let PORT =  process.env.PORT || 3000
let MAX_TABLES = 5

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Data
let tablesList =[]
let waitingList = []

//Routes
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "home.html"))
})

app.get("/reserve", (request, response) => {
    response.sendFile(path.join(__dirname, "reserve.html"))
    })

app.get("/tables", (request, response) => {
    response.sendFile(path.join(__dirname, "tables.html"))
    })

app.get("/api/tables", (request, response) => {
    return response.json(tablesList)

})

app.get("/api/waitlist", (request, response) => {
    return response.json(waitingList)

})

app.post("/api/tables", (request, response) => {
    let newReservation = request.body
    let tableAvailable = false
    if(tablesList.length < MAX_TABLES){
        tablesList.push(newReservation);
        tableAvailable = true

    }else{
        waitingList.push(newReservation)
        tableAvailable = false
    }

    response.send(tableAvailable)
    
    })

app.get("/api/clear-table", (request, response) => {
    tablesList = []
    waitingList = []
    response.end()
})


app.listen(PORT, () => {
    console.log("Server in port 3000")

})