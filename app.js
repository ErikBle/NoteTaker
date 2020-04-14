const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let dbNotes = [];

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
    // dbNotes = JSON.parse(data);
});


// gets notes from database
app.get("/api/notes", function (req, res) {
    let notes = (fs.readFileSync("./db/db.json", function (error) {
        if (error) throw error ;
    }))
    res.send(JSON.parse(notes));
});

// displays each note
// app.get("/api/notes_:id", function (req, res) {
//     for (var i = 0; i < dbNotes.length; i++) {
//         return res.json(dbNotes[i]);
//     }
    
// });

// Adds new notes
app.post("/api/notes", function(req, res){
    const title = req.body.title;
    const body = req.body.text;
    const id = Math.random();
    const notes = JSON.parse((fs.readFileSync("./db/db.json", function (error) {
        if (error) throw error ;
    })))
    
    notes.push(
        {
            "title": title,
            "text": body,
            "id": id
        }
    );

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (error) {
        if (error) throw error;
    })

    res.send(notes);
})

// Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });