import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contrasenia: String
});


export default mongoose.model("usuarios", usuariosSchema);