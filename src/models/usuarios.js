import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contrasenia: String
});

usuariosSchema.methods.encriptarContrasenia = async (contrasenia) => {
    return bcrypt.hashSync(contrasenia,bcrypt.genSaltSync(8));
}

export default mongoose.model("usuarios", usuariosSchema);