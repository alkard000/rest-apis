const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //ATORIZACION POR EL HAEDER
    const authHeader = req.get('Authorization');

    //DEBUG
    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //OBTENER UN TOKEN Y VERIFICARLO
    const token = authHeader.split(' ')[1];
    let revisarToken;

    try {
        revisarToken = jwt.verify(token, 'PALABRASECRETA');
    } catch (error) {
        error.statusCode = 500
        throw error;
    }

    //SI EL TOKEN ES VALIDO, PERO HAY ALGUN ERROR
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}