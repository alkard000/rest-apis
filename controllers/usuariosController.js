const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {

    //LEER LOS DATOS DEL USUARIO Y COLOCARLOS EN USUARIOS
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        //SI TODO ES CORRECTO, GUARDAR EL USUARIO
        await usuario.save();
        res.json({
            mensaje : 'Usuario creado corectamente'
        })
    } catch (error) {
        //SI EL CORREO ES REPETIDO O SI EXISTE UN ERROR, MOSTRARLO
        console.log(error);
        res.json({
            mensaje : 'Hubo un error'
        });
    }
}

exports.autenticarUsuario = async (req, res, next) => {

    //BUSCAR EL USUARIO
    const {email, password} = req.body
    const usuario = await Usuarios.findOne({
        email
    });

    if(!usuario){
        //SI EL USUARIO NO EXISTE
        await res.status(401).json({
            mensaje : 'Ese usuario no existe'
        });
        next();
    } else {
        //SIEL USUARIO NO EXISTE, VERIFICAR SI E USUARIO ES CORRECTO O INCORRECTO
        if(!bcrypt.compareSync(password, usuario.password)){

            //SI EL USUARIO ES INCORRECTO
            await res.status(401).json({
                mensaje : 'Usuario o Password incorrecto'
            });
            next();
        } else {

            //SI EL PASSWORD ES CORRECTO, FIRMA EL TOKEN
            const token = jwt.sign({
                email : usuario.email,
                nombre : usuario.nombre,
                id : usuario._id
            },
            'PALABRASECRETA',
            {
                expiresIn : '1h'
            });

            //RETORNAR EL TOKEN
            res.json({token});
        }

    }
}