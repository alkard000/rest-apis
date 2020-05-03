const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//IMPORTAR CORS PARA QUE UN CLIENTES SE CONECTE A OTRO SERVIDOR PARA INTERCAMBIAR RECURSOS
const cors = require('cors');

//CONECTAR MONGO
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

//CREAR EL SERVIDOR
const app = express();

//HABILITAR BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

//HABILITAR CORS
app.use(cors());

//RUTAS DE LA APP
app.use('/', routes());

//PUERTO
app.listen(4000);