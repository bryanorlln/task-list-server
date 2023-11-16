const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const app = express();

// Middleware para validar métodos HTTP válidos
const validateMethod = (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Método HTTP no permitido' });
    }
    next();
};

app.use(validateMethod); // Aplicar el middleware a nivel de aplicación

app.use('/tasks/view', listViewRouter);
app.use('/tasks/edit', listEditRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


/* para acceder a la lista de tareas completadas, deberías hacer una solicitud 
GET a http://localhost:3000/tasks/completed?type=completed, y para las tareas 
incompletas, sería http://localhost:3000/tasks/incomplete?type=incomplete */