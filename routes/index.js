const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');


module.exports = function(){

    /*********************************== CRUD DEL CLIENTE ==***************************************/

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

    /*********************************== CRUD DEL PRODUCTO ==***************************************/

    //RUTAS PARA AGREGAR NUEVOS PRODUCTOS
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //RUTAS PARA MOSTRAR TODOS LOS PRODUCTOS
    router.get('/productos',
        productosController.mostrarProductos
    );

    //MOSTRAR PRODUCTO POR ID
    router.get('/productos/:idProducto',
        productosController.mostrarUnProducto
    );

    //ACTUALIZAR PRODUCTO
    router.put('/productos/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //ELIMINAR PRODUCTO
    router.delete('/productos/:idProductos',
        productosController.eliminarProducto
    ); 

    /*********************************== CRUD DEL PEDIDO ==***************************************/

    //RUTAS PARA AGREGAR NUEVOS PEDIDOS
    router.post('/pedidos', 
        pedidosController.nuevoPedido
    );

    //RUTAS PARA LISTAR LOS PEDIDOS
    router.get('/pedidos',
        pedidosController.mostrarPedidos
    );

    //RUTAS PARA VER PEDIDO POR ID
    router.get('/pedidos/:idPedido',
        pedidosController.mostrarUnPedido
    );

    //RUTAS PARA ACTUALIZAR PEDIDO
    router.put('/pedidos/:idPedido',
        pedidosController.actualizarPedido
    );

    //ELIMINAR PRODUCTO
    router.delete('/pedidos/:idPedido',
        pedidosController.eliminarPedido
    );

    return router;
}