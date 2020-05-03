const Pedidos = require('../models/Pedidos');

//AGREGAR NUEVOS PEDIDOS A LA BASE DE DATOS
exports.nuevoPedido = async (req, res, next) => {

    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({
            mensaje : 'Se agrego nuevo pedido'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

//MOSTRAR TODOS LO PEDDISO DE LA BASE DE DATOS
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path : 'pedido.producto',
            model : 'Productos'
        });

        res.json(pedidos);

    } catch (error) {
        console.log(error);
        next();
    }
}

//MOSTRAR UN PEDIDO POR ID
exports.mostrarUnPedido = async (req, res, next) => {

    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path : 'pedido.producto',
        model : 'Productos'
    });

    if(!pedido){
        res.json({
            mensaje : 'Ese pedido no existe'
        });
        return next();
    }

    //MOSTRAR EL PEDIDO
    res.json(pedido);
}

//ACTUALIZAR UN PEDIDO
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({
            _id : req.params.idPedido
        },
        req.body, {
            new : true
        })
        .populate('cliente')
        .populate({
            path : 'pedido.producto',
            model : 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

//ELIMINAR PEDIDO
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({
            _id : req.params.idPedido
        });

        res.json({
            mensaje : 'El pedido ha sido eliminado'
        })
    } catch (error) {
        console.log(error)
    }
}