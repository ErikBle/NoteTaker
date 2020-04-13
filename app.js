const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// When user starts, gets the index file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// When user goes to the notes section, returns the notes.html file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Reads the db.json file
fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let dbNotes = JSON.parse(data);
    console.log(dbNotes)
});


// gets notes
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// displays each note
app.get("/api/notes_:id", function (req, res) {
    for (var i = 0; i < dbNotes.length; i++) {
        return res.json(dbNotes[i]);
    }
    
});

// Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });