const express = require('express');
const app = express();

const listadetareas = [
    {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog'
    },
    
];

app.get('/tareas', (req, res) => {
    res.json(listadetareas);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

//para iniciar escribe en la terminal npm run dev