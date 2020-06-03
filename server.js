const express = require("express");
const db = require("./database");


const server = express()
server.use(express.json())



server.post("/api/users", (req, res) => {
    if (req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Need a name AND Bio for the user",
        })
    } else {
        newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio,
        })
        res.status(201).json(newUser)
    }
})  

// server.post("/api/users", (req, res) => {
//     if(!req.body.name || !req.body.bio){
//         return res.status(400).json({
//             errorMessage: "Please provide name and bio for the user",
//         })
//     }
    
//     db.createUser(req.params.id)
//         .then((user)=> {
//             res.status(201).json(user)
//         })
//         .catch((error)=> {
//             console.log(error)
//             res.status(500).json({
//                 errorMessage: "There was an error while saving the user to the database."
//             })
//         })
// })



server.get("/api/users", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found for server.get /users",
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found in server.get /users/:id"
        })
    }
})


server.delete("api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found in server.delete /users/:id"
        })
    }
})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name:req.body.name || user.name,

        })
        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "User not found with the server.put for user:id"
        })
    }
})



server.listen(8000, () => {
    console.log("server is listening on port 8000")
})