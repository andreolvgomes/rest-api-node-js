const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev')); //extra
app.use('/uploads', express.Router('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Block access
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

// Routes
app.use('/produtos', require('./routes/produtos'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/usuarios', require('./routes/usuarios'));

// default, not found
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status(404);
    next(error);
});

// tratamento dos erros
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    });
});

module.exports = app;