const express = require("express")
const database = require("./database")


const server = express()

server.use(express.json())

server.get("/api/users", (req, res) => {
    const users = database.getUsers()
    res.json(users)

    if (users) {
        res.json(users)
    } else {
        res.status(500).json({message: "The users information could not be retrieved."})
    }
})

server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id
    const user = database.getUserById(userId)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.post("/api/users", (req, res) => {

    if (!req.body.name, !req.body.bio) {
        return  res.status(400).json({message: "Please provide name and bio for the user."})
    } 


    const newUser = database.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })

    res.status(201).json(newUser)
})


server.patch("/api/users/:id", (req, res) => {
    const user = database.getUserById(req.params.id)

    if (user) {
        const updatedUser = database.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = database.getUserById(req.params.id)

    if (user) {
        database.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})


server.listen(8080, () =>{
    console.log("Server started at port 8080")
})