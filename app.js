const express = require('express');
const fs = require('fs');

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/take_list', (req,res) => {
  fs.readFile('Note.json', (err, data) => {
    if(err) return res.status(500).send('Ошибка чтения данных');

    const note = JSON.parse(data);
    console.log(note)
    res.json({
      arr: note
    })
  })
});

app.post('/sendTask', (req, res) => {
  let tasks;

  fs.readFile('Note.json', (err, data) => {
    if(err) return res.status(500).send('Ошибка чтения данных');
    tasks = JSON.parse(data);
    const newTask = req.body;
    tasks.push(newTask);
    fs.writeFile('Note.json', JSON.stringify(tasks, null, 2), (err) => {
      if(err) return res.status(500)
    })
    res.json({
      arrN: tasks
    })
  })
})

app.put('/update', (req, res) => {
  fs.readFile('Note.json', (err, data) => {
    if(err) return res.status(500)
    
    let tasks;

    tasks = JSON.parse(data);
    const {id, completed} = req.body;

    const index = tasks.findIndex(t => t.id == id);

    tasks[index].completed = completed;
    fs.writeFile('Note.json', JSON.stringify(tasks, null, 2), () => {
      res.status(200).send;
    })
  })
})


app.listen(PORT, (err, res) => {
  if(err) return console.log(err);
  console.log(`start http://localhost:${PORT}`)
})