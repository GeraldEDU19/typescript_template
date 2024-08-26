import { connectDB, disconnectDB } from '../src/config/mongoose';  // Importa la configuración de mongoose
import mongoose from 'mongoose';

// Conectar a la base de datos antes de todas las pruebas
beforeAll(async () => {
  await connectDB();  // Usar la función de conexión del archivo mongoose
});

// Desconectar de la base de datos después de todas las pruebas
afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});  // Eliminar todos los documentos en cada colección
  }

  await disconnectDB();  // Usar la función de desconexión del archivo mongoose
});
