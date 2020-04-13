const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const noteTitle = $(".note-title");
const noteText = $(".note-textarea");
const saveBtn = $(".save-note");
const $noteList = $(".list-container .list-group");
const newNoteBtn = $(".new-note");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let dbNotes = []

// When user starts, or when no page is found, defaults to the index file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// When user goes to the notes section, returns the notes.html file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Reads the db.json file
fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let dbNotes = JSON.parse(data);
    console.log(dbNotes)
    
});


// Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });