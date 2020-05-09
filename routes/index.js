const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//MIDDLEWARE PARA LA PROTECCION DE CUENTAS
const auth = require('../middleware/auth');

module.exports = function(){

    /*********************************== CRUD DEL CLIENTE ==***************************************/

    //RUTA PARA AGREGAR UN CLIENTE ==>SEGUN LA ESPECIFICACIONES DE REST, CREAR UN DATO ES POR MEDIO DE POST
    router.post('/clientes',
        auth,
        clientesController.nuevoCliente
    );

    //RUTA PARA LISTAR CLIENETS ==> SEGUN LA ESPECIFICACIONES DE REST, CREAR UN DATO ES POR MEDIO DE GET
    router.get('/clientes',
        auth,
        clientesController.mostrarClientes
    );

    //RUTA PARA MOSTRAR UN CLIENTE EN ESPECIFICO
    router.get('/clientes/:idCliente',
        auth,
        clientesController.mostrarUnCliente
    );

    //RUTA PARA ACTUALIZAR EL CLIENTE ==> SEGUN REST, PUT ES EL QUE MODIFICA TODOS LOS DATOS DEL ID
    router.put('/clientes/:idCliente', 
        auth,
        clientesController.actualizarCliente
    );

    //RUTA PARA ELIMINAR EL CLIENTE ==> SEGUN REST SE DEBE ENVIAR MEDIANTE DELETE
    router.delete('/clientes/:idCliente',
        auth,
        clientesController.eliminarCliente
    );

    /*********************************== CRUD DEL PRODUCTO ==***************************************/

    //RUTAS PARA AGREGAR NUEVOS PRODUCTOS
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //RUTAS PARA MOSTRAR TODOS LOS PRODUCTOS
    router.get('/productos',
        auth,
        productosController.mostrarProductos
    );

    //MOSTRAR PRODUCTO POR ID
    router.get('/productos/:idProducto',
        auth,
        productosController.mostrarUnProducto
    );

    //ACTUALIZAR PRODUCTO
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //ELIMINAR PRODUCTO
    router.delete('/productos/:idProductos',
        auth,
        productosController.eliminarProducto
    ); 

    //BUSQUEDA DE PRODUCTOS EN EL FRONTEND
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProductos
    );

    /*********************************== CRUD DEL PEDIDO ==***************************************/

    //RUTAS PARA AGREGAR NUEVOS PEDIDOS
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido
    );

    //RUTAS PARA LISTAR LOS PEDIDOS
    router.get('/pedidos',
        auth,
        pedidosController.mostrarPedidos
    );

    //RUTAS PARA VER PEDIDO POR ID
    router.get('/pedidos/:idPedido',
        auth,
        pedidosController.mostrarUnPedido
    );

    //RUTAS PARA ACTUALIZAR PEDIDO
    router.put('/pedidos/:idPedido',
        auth,
        pedidosController.actualizarPedido
    );

    //ELIMINAR PRODUCTO
    router.delete('/pedidos/:idPedido',
        auth,
        pedidosController.eliminarPedido
    );

    /*********************************== USUARIOS ==***************************************/

    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );

    return router;
}