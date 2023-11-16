const express = require('express');
const listViewRouter = express.Router();

const tasks = [
    {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog'
    },
    
];

// Middleware para validar parámetros
const validateParams = (req, res, next) => {
    const { type } = req.query;

    if (type !== 'completed' && type !== 'incomplete') {
        return res.status(400).send('Error 400: Parámetro inválido');
    }
    
    next();
};

// Ruta para listar tareas completas
listViewRouter.get('/completed', validateParams, (req, res) => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    res.json(completedTasks);
});

// Ruta para listar tareas incompletas
listViewRouter.get('/incomplete', validateParams, (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
});

module.exports = listViewRouter;
