/**
 * Main server module
 */

const express = require('express');
const path = require('path');
const fs = require('fs');


//read notes data from db.json
let notes = fs.readFileSync('./db/db.json');
notes = JSON.parse(notes);


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));  //loads static resources
//routes//
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));   //sends html file upon request
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, '/public/notes.html')));   //sends html file upon request

//API view of notes//
app.get('/api/notes', (request, response) => response.json(notes));   //sends JSON data upon request

//Adding a new post to Database//
//Notes is an array of data//
app.post('/api/notes', (request, response) =>{
    const newNote = request.body
    console.log("before", notes)
    notes.push(newNote)
    console.log("after", notes)
    response.end()
} );   //sends JSON data upon request

app.delete('/api/notes/:id', (request, response) => {
    const noteid = request.params.id
    console.log("removing item with title of", noteid)
    //remove item from notes//
    notes = notes.filter(note => note.id != noteid)
    response.end()
});   //Delete note from Database on click

//makes app go
app.listen(PORT, () => console.log(`Note Taker app listening on PORT: ${PORT}`));