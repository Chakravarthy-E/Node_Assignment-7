const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;
const students = require("./InitailData");
let nextId = students.length + 1;

//get

app.get("/api/student", (req, res) => {
  try {
    res.json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//get by ID

app.get("/api/student/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const student = students.find((student) => student.id === id);
    if (!student) {
      res.status(404).json({ error: message.error });
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//post

app.post("/api/student", (req, res) => {
  try {
    const { name, currentClass, division } = req.body;
    if (!name || !currentClass || !division) {
      res.status(400).json({ message: error.message });
    } else {
      const newStudent = {
        id: nextId,
        name,
        currentClass,
        division,
      };
      students.push(newStudent);
      nextId++;
      res.json({ id: newStudent.id });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//put

app.put("/api/student/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const student = students.find((student) => student.id === id);
    if (!student) {
      res.status(400).json({ message: error.message });
    } else if (!name) {
      res.status(400).json({ message: error.message });
    } else {
      student.name = name;
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete

app.delete("/api/student/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = students.findIndex((ind) => ind.id === id);
    if (index === -1) {
      res.status(400).json({ message: error.message });
    } else {
      students.splice(index, 1);
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
