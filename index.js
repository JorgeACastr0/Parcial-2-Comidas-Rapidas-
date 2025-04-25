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

//Actualizar restaurante
app.put('/api/actualizarrestaurantes/:id', async (req, res) => {
  try {
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const result = await sql`
      UPDATE Restaurante
      SET nombre = ${nombre}, ciudad = ${ciudad}, direccion = ${direccion}, fecha_apertura = ${fecha_apertura}
      WHERE id_rest = ${req.params.id}
      RETURNING *;
    `;
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error actualizando restaurante', details: error.message });
  }
});


//borrar restaurante
app.delete('/api/borrarrestaurantes/:id', async (req, res) => {
  try {
    await sql`DELETE FROM Restaurante WHERE id_rest = ${req.params.id};`;
    res.status(200).json({ success: true, message: 'Restaurante eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando restaurante', details: error.message });
  }
});


//Nuevo empleado

app.post('/api/nuevoempleado', async (req, res) => {
  try {
    const { nombre, rol, id_rest } = req.body;
    const result = await sql`
      INSERT INTO Empleado (nombre, rol, id_rest)
      VALUES (${nombre}, ${rol}, ${id_rest})
      RETURNING *;
    `;
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creando empleado', details: error.message });
  }
});


//Listar empleados
app.get('/api/verempleados', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM Empleado;`;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo empleados', details: error.message });
  }
});

//Actualizar un empleado
app.put('/api/actualizarempleados/:id', async (req, res) => {
  try {
    const { nombre, rol, id_rest } = req.body;
    const result = await sql`
      UPDATE Empleado
      SET nombre = ${nombre}, rol = ${rol}, id_rest = ${id_rest}
      WHERE id_empleado = ${req.params.id}
      RETURNING *;
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error actualizando empleado', details: error.message });
  }
});

//Eliminar empleado
app.delete('/api/borrarempleados/:id', async (req, res) => {
  try {
    await sql`DELETE FROM Empleado WHERE id_empleado = ${req.params.id};`;
    res.json({ success: true, message: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando empleado', details: error.message });
  }
});

//Crear  producto nuevo
app.post('/api/productonuevo', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const result = await sql`
      INSERT INTO Producto (nombre, precio)
      VALUES (${nombre}, ${precio})
      RETURNING *;
    `;
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creando producto', details: error.message });
  }
});

//Listar productos
app.get('/api/listarproductos', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM Producto;`;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo productos', details: error.message });
  }
});

//Actualizar producto
app.put('/api/actualizarproductos/:id', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const result = await sql`
      UPDATE Producto
      SET nombre = ${nombre}, precio = ${precio}
      WHERE id_prod = ${req.params.id}
      RETURNING *;
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error actualizando producto', details: error.message });
  }
});

//Borrar Producto
app.delete('/api/borrarproductos/:id', async (req, res) => {
  try {
    await sql`DELETE FROM Producto WHERE id_prod = ${req.params.id};`;
    res.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando producto', details: error.message });
  }
});

//Nuevo pedido
app.post('/api/nuevopedido', async (req, res) => {
  try {
    const { fecha, id_rest, total } = req.body;
    const result = await sql`
      INSERT INTO Pedido (fecha, id_rest, total)
      VALUES (${fecha}, ${id_rest}, ${total})
      RETURNING *;
    `;
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creando pedido', details: error.message });
  }
});

//listar pedidos
app.get('/api/listarpedidos', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM Pedido;`;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo pedidos', details: error.message });
  }
});

//Actualizar un pedido
app.put('/api/actualizarpedido/:id', async (req, res) => {
  try {
    const { fecha, id_rest, total } = req.body;
    const result = await sql`
      UPDATE Pedido
      SET fecha = ${fecha}, id_rest = ${id_rest}, total = ${total}
      WHERE id_pedido = ${req.params.id}
      RETURNING *;
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error actualizando pedido', details: error.message });
  }
});

//Borrar pedido
app.delete('/api/borrarpedido/:id', async (req, res) => {
  try {
    await sql`DELETE FROM Pedido WHERE id_pedido = ${req.params.id};`;
    res.json({ success: true, message: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando pedido', details: error.message });
  }
});

//Nuevo detallepedido
app.post('/api/nuevodetallepedido', async (req, res) => {
  try {
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const result = await sql`
      INSERT INTO DetallePedido (id_pedido, id_prod, cantidad, subtotal)
      VALUES (${id_pedido}, ${id_prod}, ${cantidad}, ${subtotal})
      RETURNING *;
    `;
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creando detalle', details: error.message });
  }
});


//Listar detallesPedido
app.get('/api/listardetallespedidos', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM DetallePedido;`;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo detalles', details: error.message });
  }
});

//Actualizar un detallepedido
app.put('/api/actualizardetallepedido/:id', async (req, res) => {
  try {
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const result = await sql`
      UPDATE DetallePedido
      SET id_pedido = ${id_pedido}, id_prod = ${id_prod}, cantidad = ${cantidad}, subtotal = ${subtotal}
      WHERE id_detalle = ${req.params.id}
      RETURNING *;
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error actualizando detalle', details: error.message });
  }
});

//Borrar detallepedido
app.delete('/api/borrardetallepedido/:id', async (req, res) => {
  try {
    await sql`DELETE FROM DetallePedido WHERE id_detalle = ${req.params.id};`;
    res.json({ success: true, message: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando detalle', details: error.message });
  }
});


//obtener todos los productos de un pedido especifico
app.get('/api/pedido/:id/productos', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`
      SELECT p.nombre, p.precio, dp.cantidad, dp.subtotal
      FROM DetallePedido dp
      JOIN Producto p ON dp.id_prod = p.id_prod
      WHERE dp.id_pedido = ${id};
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo productos del pedido', details: error.message });
  }
});

//obtener los productos mas vendidos
app.get('/api/productos/mas-vendidos', async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        p.nombre, 
        SUM(dp.cantidad) AS total_vendidos
      FROM DetallePedido dp
      JOIN Producto p ON dp.id_prod = p.id_prod
      GROUP BY p.nombre
      ORDER BY total_vendidos DESC
      LIMIT 10;
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo productos más vendidos', details: error.message });
  }
});



//Total de ventas por restaurante
app.get('/api/ventas/por-restaurante', async (req, res) => {
  try {
    const result = await sql`
      SELECT r.nombre AS restaurante, SUM(p.total) AS total_ventas
      FROM Pedido p
      JOIN Restaurante r ON p.id_rest = r.id_rest
      GROUP BY r.nombre
      ORDER BY total_ventas DESC;
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo ventas por restaurante', details: error.message });
  }
});

//obtener pedido por fecha

app.get('/api/pedidos/fecha/:fecha', async (req, res) => {
  const { fecha } = req.params;
  try {
    const result = await sql`
      SELECT * FROM Pedido
      WHERE fecha = ${fecha};
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo pedidos por fecha', details: error.message });
  }
});


//obtener empleados por rol 
app.get('/api/empleados/rol/:rol', async (req, res) => {
  const { rol } = req.params;
  try {
    const result = await sql`
      SELECT e.nombre, e.rol, r.nombre AS restaurante, r.ciudad
      FROM Empleado e
      JOIN Restaurante r ON e.id_rest = r.id_rest
      WHERE LOWER(e.rol) = LOWER(${rol});
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo empleados por rol', details: error.message });
  }
});




//Crear puerto de conexion del servidor
const PORT = 3000;

//La conexion la va a escuchar por el puerto 3000 y si 
app.listen(PORT, ()=>{
    console.log('El servidor esta corriendo');

});