const express = require('express');
const listEditRouter = express.Router();

// Middleware para validar el cuerpo de las solicitudes POST y PUT
const validateTaskBody = (req, res, next) => {
    const { id, isCompleted, description } = req.body;

    if (req.method === 'POST' && (!id || !description || !isCompleted)) {
        return res.status(400).json({ error: 'Solicitud POST con información faltante' });
    }

    if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Solicitud PUT con el cuerpo vacío' });
    }

    if (
        req.method === 'PUT' &&
        (isCompleted === undefined || description === undefined)
    ) {
        return res.status(400).json({ error: 'Solicitud PUT con información no válida' });
    }

    next();
};

let tasks = [
    {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog'
    },
    
];

// Aplicar el middleware 
listEditRouter.post('/create', validateTaskBody, (req, res) => {
    const { id, isCompleted, description } = req.body;
    const newTask = { id, isCompleted, description };
    tasks.push(newTask);
    res.json({ message: 'Tarea creada exitosamente', task: newTask });
});

listEditRouter.put('/:taskId', validateTaskBody, (req, res) => {
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

listEditRouter.delete('/:taskId', (req, res) => {
    const { taskId } = req.params;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarea eliminada exitosamente' });
});

module.exports = listEditRouter;
