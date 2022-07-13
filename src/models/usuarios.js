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
usuariosSchema.methods.compararContrasenia = async (contrasenia) => {
    return bcrypt.compareSync(contrasenia,this.contrasenia);
}

export default mongoose.model("usuarios", usuariosSchema);