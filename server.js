const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/scriptures', {
  useNewUrlParser: true
});

const verseSchema = new mongoose.Schema({
  verse: String,
  passage: String,
  notes: String,
  editing: Boolean,
})

const Verse = mongoose.model('Verse',verseSchema);
app.post('/api/scriptures', async(req,res) => {
  const verse = new Verse({
    verse: req.body.verse,
    passage: req.body.passage,
    notes: req.body.notes,
    editing: false,
  });
  try {
    await verse.save();
    res.send(verse);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/scriptures', async (req, res) => {
  try {
    let scriptures = await Verse.find();
    res.send(scriptures);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/scriptures/:id', async (req, res) => {
  try {
    await Verse.deleteOne({_id: req.params.id});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/scriptures/:id', async (req, res) => {
  try {
    var verse = await Verse.findOne({_id: req.params.id});
    verse.verse = req.body.verse;
    verse.passage = req.body.passage;
    verse.notes = req.body.notes;
    verse.editing = req.body.editing;
    await verse.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(8000, () => console.log('Server listening on port 8000!'));
