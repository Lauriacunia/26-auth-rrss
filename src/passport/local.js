import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import  Usuario  from "../models/usuarios.js";

const localStrategy = LocalStrategy

passport.use('registro', new localStrategy({
    /**Por default espera un username y un password. Definirle esos campos segun mi form */
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true //Para que el callback reciba el req completo
    }, async (req, nombre, password, done) => { // done es un callback que se ejecuta cuando termina la funcion
        const usuarioDB = await Usuario.findOne({ nombre });
        if (usuarioDB) {
            return done(null, false, { message: 'El usuario ya existe' });
        }
        const nuevoUsuario = new Usuario();
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.contrasenia = password;
        await nuevoUsuario.save();
        return done(null, nuevoUsuario);
    }
));

passport.use('login', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true //Para que el callback reciba el req completo
    }, async (req, nombre, password, done) => { // done es un callback que se ejecuta cuando termina la funcion
        const usuarioDB = await Usuario.findOne({ nombre });
        if (!usuarioDB) {
            return done(null, false, { message: 'El usuario no existe' });
        }
        if (usuarioDB.contrasenia !== password) {
            return done(null, false, { message: 'El password es incorrecto' });
        }
        return done(null, usuarioDB);
    }
));

/** hay dos funciones que passport necesita para trabajar con los ids de los usuarios en toda la app:
 * serializeUser: para guardar el id del usuario en la sesion
 * deserializeUser: para obtener el usuario de la base de datos por el id */
passport.serializeUser((usuario, done) => {
    done(null, usuario.id); // _id de mongo
});

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
});