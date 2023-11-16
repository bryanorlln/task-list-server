const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const app = express();

app.use('/tasks/view', listViewRouter);

app.use('/tasks/edit', listEditRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

//para ver una ruta usa http://localhost:3000/tasks/view/incomplete
