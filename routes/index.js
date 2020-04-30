const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController');

module.exports = function(){

    //RUTA PARA AGREGAR UN CLIENTE ==>SEGUN LA ESPECIFICACIONES DE REST, CREAR UN DATO ES POR MEDIO DE POST
    router.post('/clientes',
        clientesController.nuevoCliente
    );

    //RUTA PARA LISTAR CLIENETS ==> SEGUN LA ESPECIFICACIONES DE REST, CREAR UN DATO ES POR MEDIO DE GET
    router.get('/clientes',
        clientesController.mostrarClientes
    );

    //RUTA PARA MOSTRAR UN CLIENTE EN ESPECIFICO
    router.get('/clientes/:idCliente',
        clientesController.mostrarUnCliente
    );

    //RUTA PARA ACTUALIZAR EL CLIENTE ==> SEGUN REST, PUT ES EL QUE MODIFICA TODOS LOS DATOS DEL ID
    router.put('/clientes/:idCliente', 
        clientesController.actualizarCliente
    );

    //RUTA PARA ELIMINAR EL CLIENTE ==> SEGUN REST SE DEBE ENVIAR MEDIANTE DELETE
    router.delete('/clientes/:idCliente',
        clientesController.eliminarCliente
    );

    return router;
}