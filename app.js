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

// gets notes from database
app.get("/api/notes", function (req, res) {
    let notes = (fs.readFileSync("./db/db.json", function (error) {
        if (error) throw error ;
    }))
    res.send(JSON.parse(notes));
});

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

// Deletes selected note (selected from unique id)
app.delete("/api/notes/:id", function(req,res){
    const goodbyeID = req.params.id
    const notes = JSON.parse((fs.readFileSync("./db/db.json", function (error) {
        if (error) throw error ;
    })))

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == goodbyeID) {
            notes.splice(i, 1);
        }
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (error) {
        if (error) throw error;
    })

    res.send(notes);
})

// Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });