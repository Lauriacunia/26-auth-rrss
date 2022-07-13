import jwt from 'jsonwebtoken';
const PRIVATE_KEY = 'myKey';

export function generarToken(payload) {
    return jwt.sign(payload, PRIVATE_KEY,{ expiresIn: '1h' });
}

export function auth(req, res, next) {
    // el front envía el token en el header
    const token = req.header['Autorization'] || req.header['authorization'];
    if (token) {
        jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    error: 'Token no valido'
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            error: 'No hay token' // o reenviar al login
        });
    }
}