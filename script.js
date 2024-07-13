const express = require('express');
let app = express()
const path = require('path');
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", { files: files })
    })
})

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err, files) => {
        res.redirect("/")
    })
})

app.get('/delet/:user', (req, res) => {
    res.render("delet", { filename: req.params.user })
})

app.post("/delet", (req, res) => {
    fs.unlink(`./files/${req.body.title}`, (err) => {
        res.redirect("/")
    })
})

app.get("/files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filenames) => {
        res.render("show", { filename: req.params.filename, filedata: filenames })
    })
})

app.get("/edit/:filename", (req, res) => {
    res.render("edit", { filename: req.params.filename })
})

app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.next}`, (err) => {
        res.redirect("/")
    })
})

app.listen(3000)