import express from 'express';
import sql from './db.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/api/prueba' , (req, res) => {

    res.send('LA API FUNCIONA');
});

app.post('/api/nuevorestaurante', async (req, res) => {
    try {
      const { nombre, ciudad, direccion, fecha_apertura } = req.body;
      const result = await sql`
        INSERT INTO Restaurante (nombre, ciudad, direccion, fecha_apertura)
        VALUES (${nombre}, ${ciudad}, ${direccion}, ${fecha_apertura})
        RETURNING *;
      `;
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear restaurante', details: error.message });
    }
  });



//AQUI SE CONSULTA UN RESTURANTE POR ID
app.get('/api/consultarrestaurante/:id', async (req, res) => {
    try {
      const result = await sql`SELECT * FROM Restaurante WHERE id_rest = ${req.params.id};`;
      res.status(200).json({ success: true, data: result }); //Devuelve el resultado 
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error consultando restaurante', details: error.message });
    }
  });

  


//Crear puerto de conexion del servidor
const PORT = 3000;

//La conexion la va a escuchar por el puerto 3000 y si 
app.listen(PORT, ()=>{
    console.log('El servidor esta corriendo');

});