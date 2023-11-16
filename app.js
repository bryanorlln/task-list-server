const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const app = express();

dotenv.config(); // Cargar variables de entorno desde el archivo .env

// Middleware para validar métodos HTTP válidos
const validateMethod = (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Método HTTP no permitido' });
    }
    next();
};

// Middleware para verificar el token JWT en las rutas protegidas
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado: token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        // Si el token es válido, se puede continuar con la solicitud
        req.user = decoded;
        next();
    });
};

app.use(express.json()); // Middleware para manejar solicitudes JSON
app.use(validateMethod); // Aplicar el middleware de método a nivel de aplicación

// Array de usuarios predefinidos (esto podría provenir de una base de datos)
const predefinedUsers = [
    { username: 'usuario1', password: 'contraseña1' },
    { username: 'usuario2', password: 'contraseña2' },
    // ... otros usuarios
];

// Ruta para autenticación y creación del token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = predefinedUsers.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Establecer la expiración del token
    });

    res.json({ token });
});

// Ruta protegida que requiere token JWT para acceder
app.use('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida', user: req.user });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});


//Para correrlo (npm run dev) y ingresar en postman las rutas.