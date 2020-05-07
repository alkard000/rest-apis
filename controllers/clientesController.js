const Clientes = require('../models/Clientes');

//AGREGAR NUEVO CLIENTE

exports.nuevoCliente = async (req, res, next) => {

    const cliente = new Clientes(req.body);

    try {

        //ALMACENAR REGISTRO
        await cliente.save();
        res.json({
            mensaje : 'Se agrego un nuevo cliente'
        });

    } catch (error) {

        //SI EXISTE UN EEROR, MOSTRAR EL ERROR Y NEXT
        res.send(error);
        next();
    }

}

//MOSTRAR TODOS LOS CLIENTES

exports.mostrarClientes = async (req, res) => {

    try {
        
        //TRAEMOS A OTDOS LO CLIENTES DE LA BASE DE DATOS
        const clientes = await Clientes.find({});
        res.json(clientes);

    } catch (error) {
        
        //CAPTURAMOS EL ERROR
        console.log(error);
        next();
    }
}

//MUESTRA UN SOLO CLIENTE
exports.mostrarUnCliente = async (req, res, next) => {

    //OBTENER AL CLIENTE Y GUARDARLO EN UNA CONSTANTE
    const cliente = await Clientes.findById(req.params.idCliente);
    
    //SI NO EXISTE LE CLIENTE
    if(!cliente){
        res.json({
            mensaje : 'Este cliente no existe'
        });
        next();
    }
    
    //MOSTRAR CLIENTE
    res.json(cliente);
}

//ACTUALIZA UN CLIENTE POR SU ID
exports.actualizarCliente = async (req, res, next) => {

    //TOMAMOS EL VALOR DEL CLIENTE A ACTUALIZAR
    try {
        const cliente = await Clientes.findOneAndUpdate({
            _id : req.params.idCliente
        },
        req.body, { //==> LOS NUEVOS DATOS
            new : true //==>CALLBACK PARA LA ACTUALIZACION
        });
        
        //SE CREA EL JSON
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

//ELIMINA UN CLIENTE POR ID
exports.eliminarCliente = async (req, res, next) => {

    try {
        await Clientes.findOneAndDelete({
            _id : req.params.idCliente
        });

        res.json({
            mensaje : 'El cliente ha sido eliminado'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}
