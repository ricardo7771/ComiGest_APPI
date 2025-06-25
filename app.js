import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { MONGO_URI, PORT } from './config.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/usuarios', authRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));
