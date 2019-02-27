// modules
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const chalk = require('chalk');

// files
var notes = require('./notes.js')

// locals
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'The body of the note',
    demand: true,
    alias: 'b'
};

const say = (string) => console.log(chalk.cyan(string));
const argv = yargs
    .command('add','Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','List all notes')
    .command('read','Read a note', {
        title: titleOptions
    })
    .command('remove','Remove a note', {
        title: titleOptions
    })
    .help()
    .argv; // yargs instead of using node's <process> command
var command = argv._[0];

// app structure

var actions = {
    // end user actions
    add: () => {
        var note = notes.addNote(argv.title, argv.body);
        if (note) {
            say('Note Added');
            notes.logNote(note);
        } else {
            say(`Error: Note Not Added, try a different title.`);
        }
    },
    list: () => {
        var allNotes = notes.getAll();
        say(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => notes.logNote(note));
    },
    read: () => {
        var note = notes.getNote(argv.title);
        if (note) {
            say('Note Found');
            notes.logNote(note);
        } else {
            say(`Note "${argv.title}" not found.`);
        }
    },
    remove: () => {
        var note = notes.getNote(argv.title);
        if (note) {
            say('Note Found');
            notes.logNote(note);
        } else {
            say(`Note "${argv.title}" not found.`);
        }
    },
    // app actions
    undefined: () => {
        say(`Please enter a command. Use --help for more info`);
    },
    unknown: () => {
        say(`Command <${command}> not recognized`);
    }
}

// app init
var action = actions[command];
if ( action ) action();
else actions['unknown']();



// original app structure from tutorial using 'if...else' chain
// this was refactored into using an object literal instead (see above)

// if (command === 'add'){
//     var note = notes.addNote(argv.title, argv.body);
//     if (note) {
//         say('Note Added');
//         notes.logNote(note);
//     } else {
//         say(`Error: Note Not Added, try a different title.`);
//     }
// } else if (command === 'list') {
//     var allNotes = notes.getAll();
//     say(`Printing ${allNotes.length} note(s).`);
//     allNotes.forEach((note) => notes.logNote(note));
// } else if (command === 'read') {
//     var note = notes.getNote(argv.title);
//     if (note) {
//         say('Note Found');
//         notes.logNote(note);
//     } else {
//         say(`Note "${argv.title}" not found.`);
//     }
// } else if (command === 'remove'){
//     var removed = notes.removeNote(argv.title);
//     var message = removed ? `Note "${removed}" removed` : `Note "${argv.title}" not found.`;
//     say(message);
// } else {
//     console.log(`Command <${command}> not recognized`);
// }
