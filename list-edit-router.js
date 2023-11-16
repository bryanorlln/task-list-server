const express = require('express');
const listEditRouter = express.Router();


let tasks = [
    {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog'
    },
    
];

// Ruta para crear una tarea
listEditRouter.post('/create', (req, res) => {
    const { id, isCompleted, description } = req.body;
    const newTask = { id, isCompleted, description };
    tasks.push(newTask);
    res.json({ message: 'Tarea creada exitosamente', task: newTask });
});

// Ruta para eliminar una tarea
listEditRouter.delete('/:taskId', (req, res) => {
    const { taskId } = req.params;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarea eliminada exitosamente' });
});

// Ruta para actualizar una tarea
listEditRouter.put('/:taskId', (req, res) => {
    const { taskId } = req.params;
    const { isCompleted, description } = req.body;
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                isCompleted: isCompleted !== undefined ? isCompleted : task.isCompleted,
                description: description !== undefined ? description : task.description
            };
        }
        return task;
    });
    res.json({ message: 'Tarea actualizada exitosamente' });
});

module.exports = listEditRouter;