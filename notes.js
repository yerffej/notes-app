// modules
const fs = require('fs');

// locals
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title); // ES6 arrow functions can take single line expressions without curly brackets

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var note = notes.filter((note) => note.title === title)[0];
    return note;
};

var removeNote = (title) => {
    var notes = fetchNotes();    // fetch notes
    var remainingNotes = notes.filter((note) => note.title !== title);    // filter notes removing the one with title of argument
    if (notes.length !== remainingNotes.length) {
        saveNotes(remainingNotes);
        return title;
    }
}

var logNote = (note) => {
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);``
}

// exports
module.exports = {
    addNote, // ES6 syntax for <addNote: addNote>
    getAll,
    getNote,
    removeNote,
    logNote
};
