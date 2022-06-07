const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New note has been added.');
    } else {
        console.log('Note title already exists.');
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > notesToKeep.length) {
        console.log('Note deleted.');
        saveNotes(notesToKeep);
    }
    else {
        console.log('Note not found.');
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note) {
        console.log(note.title);
        console.log(note.body);
    }
    else {
        console.log('Note not found.');
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log('Your notes');

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}