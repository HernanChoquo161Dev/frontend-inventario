import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([]) // Nuevo estado para los usuarios

  const obtenerDatos = async () => {
    try {
      // Pedimos los productos
      const resProductos = await fetch('http://localhost:3000/api/productos');
      const dataProductos = await resProductos.json();
      setProductos(dataProductos);

      // Pedimos los usuarios que vienen de la Raspberry
      const resUsuarios = await fetch('http://localhost:3000/api/usuarios');
      const dataUsuarios = await resUsuarios.json();
      setUsuarios(dataUsuarios);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  useEffect(() => {
    obtenerDatos();
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Panel de Control Principal</h1>
      
      {/* Tabla 1: Productos */}
      <h2>Inventario de Productos</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead style={{ backgroundColor: '#e6f7ff' }}>
          <tr>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>Nombre</th>
            <th style={{ padding: '8px' }}>Precio ($)</th>
            <th style={{ padding: '8px' }}>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id_product}>
              <td style={{ padding: '8px' }}>{producto.id_product}</td>
              <td style={{ padding: '8px' }}>{producto.name}</td>
              <td style={{ padding: '8px' }}>{producto.price}</td>
              <td style={{ padding: '8px' }}>{producto.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla 2: Usuarios (Desde la Raspberry) */}
      <h2>Personal del Sistema (Raspberry Pi)</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#e6ffe6' }}>
          <tr>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>Nombre</th>
            <th style={{ padding: '8px' }}>Edad</th>
            <th style={{ padding: '8px' }}>Cargo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id_usuario}>
              <td style={{ padding: '8px' }}>{user.id_usuario}</td>
              <td style={{ padding: '8px' }}>{user.nombre}</td>
              <td style={{ padding: '8px' }}>{user.edad}</td>
              <td style={{ padding: '8px' }}>{user.cargo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App