const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//CONFIGURACION MULTER
const configuracionMulter = {
    storage : fileStorage = multer.diskStorage({
        destination : (req, file, cb) => {                  //CARPETA A LA QUE VA DIRIGIDA LA IMAGEN DEL PRODUCTO
            cb(null, __dirname + '../../uploads/');
        },
        filename : (req, file, cb) => {                     //NOMBRE QUE S ELE DA  A LA IMAGEN
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {                             //FILTRAR LA IMAGEN POR EXTENSION
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(new Error('Formato no Valido'))
        }
    }
}

//PASAR LA CONFIGURACION Y EL CAMPO
const upload = multer(configuracionMulter).single('imagen'); //==> NOMBRE DEL CAMPO

//SUBIR EL ARCHIVO
exports.subirArchivo = (req, res, next) => {

    //CONDICIONAL PARA EVITAR ERRORES DE MULTER
    upload(req, res, function(error){
        if(error){
            res.json({
                mensaje : error
            })
        }
        return next();
    })
}

//AGREGAR NUEVOS PRODUCTOS
exports.nuevoProducto = async (req, res, next) => {

    //SE CREA LA VARIABLE PRODUCTOS 
    const producto = new Productos(req.body);

    //UN TRYCATCH PARA CAPTURAR ERRORES
    try {

        if(req.file.filename){ //==> SI EXISTE UN ARCHICO, S ELE ASIGNA ESE ARCHIVO A LA BASE DE DATOS
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({
            mensaje : 'Se ha agregado un nuevo producto'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

//MOSTRAR LOS PRODUCTOS
exports.mostrarProductos = async (req, res, next) => {

    try {
        //OBTENER TODOS LOS PRODUCTOS
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//MOSNTRAR UN PRODUCTO POR SU ID
exports.mostrarUnProducto = async (req, res, next) => {

    //OBTENEMOS EL PRODUCTO A TRAVES DEL ID QUE SE LE PASA POR GET
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto){
        res.json({
            mensaje : 'Ese producto no existe'
        });
        return next();
    }

    //MOSTRAR EL PRODUCTO
    res.json(producto);
}

//ACTUALIZAR UN PRODUCTO
exports.actualizarProducto = async (req, res, next) => {

    try {

        //CONSTRUIR UN NUEVO PRODUCTO
        let nuevoProducto = req.body;

        //VERIFICAR SI HAY IMAGEN NUEVA
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({
            _id : req.params.idProducto
        },
        nuevoProducto,{
            new : true
        });

        res.json(producto);

    } catch (error) {
        console.log(error);
        return next();
    }
}

//ELIMINAR UN PRODUCTO
exports.eliminarProducto = async (req, res, next) => {

    try {
        const producto = await Productos.findByIdAndDelete({
            _id : req.params.idProductos
        });

        if(req.file || producto.imagen){

            const imagenAnterior = __dirname + `../../uploads/${producto.imagen}`;

            // eliminar archivo con filesystem
            fs.unlink(imagenAnterior, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }

        res.json({
            mensaje : 'El producto se ha eliminado y su Imagen'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}