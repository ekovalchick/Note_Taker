const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//api end point http://localhost:3001/api/notes
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});



// DELETE Route for a specific tip
notes.delete('/:tip_id', (req, res) => {
  const tipId = req.params.tip_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((tip) => tip.tip_id !== tipId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${tipId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip (post is a create)
//http://localhost:3001/api/notes/

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title,text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    const parsedData= readAndAppend(newNote, './db/db.json');
    res.json( parsedData);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = notes;
