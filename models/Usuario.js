import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  correo: { type: String },
  telefono: { type: String, required: true },
  password: { type: String, required: true },
  metodoAcceso: { type: String, enum: ['telefono', 'correo'], required: true }
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('Usuario', usuarioSchema);
