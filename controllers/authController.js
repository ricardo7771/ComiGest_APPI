import Usuario from '../models/Usuario.js';

export const registrarUsuario = async (req, res) => {
  try {
    const { nombreCompleto, correo, telefono, password, metodoAcceso } = req.body;

    const existeTelefono = await Usuario.findOne({ telefono });
    if (existeTelefono) return res.status(400).json({ mensaje: 'El número ya está registrado' });

    const nuevoUsuario = new Usuario({ nombreCompleto, correo, telefono, password, metodoAcceso });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { nombreUser, password } = req.body;

    const usuario = await Usuario.findOne({ nombreCompleto: nombreUser });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const esValido = await usuario.compararPassword(password);
    if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    res.status(200).json({ mensaje: 'Login exitoso' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.message });
  }
};
