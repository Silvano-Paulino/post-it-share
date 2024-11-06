const express = require("express");
const {saveNote} = require("./db");
const crypto = require("crypto");
const app =  express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"index.html");
})

app.get("/note/:id", (req, res) => {
    res.sendFile(__dirname+ "/public/note.html");
})

app.post("/notes", async (req, res) => {
    const {content} = req.body;

    if (!content) {
        res.send("<span>Erro inesperado</span>")
    }

    const id = crypto.randomUUID();

    await saveNote(id, content)
    res.send(`
        <p>
            Compartilhe sua nota através do link.
            <br/>
            <span>${req.headers.origin}/note/${id}</span>
        </p>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})