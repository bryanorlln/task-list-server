const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let tasks = [
    { id: 1, title: 'Hacer la compra', completed: false },
    { id: 2, title: 'Estudiar para el examen', completed: true },
    { id: 3, title: 'Hacer ejercicio', completed: false }
];
let nextTaskId = 4;

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Se requiere un título para la tarea' });
    }

    const newTask = { id: nextTaskId, title, completed: false };
    nextTaskId++;
    tasks.push(newTask);

    res.status(201).json({ task: newTask });
});

// Obtener una sola tarea por su ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ task });
});

// Actualizar una tarea por su ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (title) {
        tasks[taskIndex].title = title;
    }

    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }

    res.json({ task: tasks[taskIndex] });
});

// Eliminar una tarea por su ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarea eliminada exitosamente' });
});

// Listar tareas completas e incompletas
app.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.json({ completedTasks });
});

app.get('/tasks/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    res.json({ incompleteTasks });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
