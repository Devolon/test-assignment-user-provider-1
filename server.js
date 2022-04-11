const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')
let rawdata = fs.readFileSync('users.json')
const users = JSON.parse(rawdata)

app.get('/users', (req, res) => {
    let pageSize = parseInt(req.query.size)
    if (!pageSize) {
        pageSize = 10
    }

    const pageCount = Math.ceil(users.length / pageSize)

    let page = parseInt(req.query.page)

    if (!page) {
        page = 1
    }

    if (page > pageCount) {
        page = pageCount
    }

    res.json({
        "page": page,
        "pageCount": pageCount,
        "posts": users.slice(page * pageSize - pageSize, page * pageSize)
    });
})

app.get('/users/:email', (req, res) => {
    const email = req.params.email
    const user = users.find((user) => user.email === email)

    if (!user) {
        res.status(404).json({
            error: 404,
            message: "User not found"
        })
        return
    }

    res.json(user)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})