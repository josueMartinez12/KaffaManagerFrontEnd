import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Limpia el token de sesión
    navigate('/login');
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Barra Lateral / Sidebar */}
      <aside style={{ 
        width: '260px', 
        background: '#1a1a1a', 
        color: 'white', 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed', // Mantiene el menú fijo
        height: '100vh'
      }}>
        <h2 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '10px' }}>Kaffa Manager</h2>
        <p style={{ fontSize: '12px', textAlign: 'center', opacity: 0.6 }}>Panel de Administración</p>
        <hr style={{ borderColor: '#333', margin: '20px 0' }} />
        
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={liStyle}>
              <Link to="/home" style={linkStyle}>🏠 Inicio</Link>
            </li>
            <li style={liStyle}>
              <Link to="/products" style={linkStyle}>📦 Productos</Link>
            </li>
            <li style={liStyle}>
              <Link to="/customers" style={linkStyle}>👥 Clientes</Link>
            </li>
            <li style={liStyle}>
              <Link to="/users" style={linkStyle}>⚙️ Usuarios</Link>
            </li>
          </ul>
        </nav>

        <button 
          onClick={handleLogout} 
          style={{ 
            marginTop: 'auto', 
            cursor: 'pointer',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Área de Contenido */}
      <main style={{ 
        flex: 1, 
        padding: '40px', 
        background: '#f4f4f4',
        marginLeft: '260px' // Deja espacio para la sidebar fija
      }}>
        {/* Aquí es donde se renderizarán las páginas (Home, Products, etc.) */}
        <Outlet /> 
      </main>
    </div>
  );
};

// Estilos rápidos para limpiar el código JSX
const liStyle = { margin: '10px 0' };
const linkStyle = { 
  color: 'white', 
  textDecoration: 'none', 
  fontSize: '18px',
  display: 'block',
  padding: '10px',
  borderRadius: '4px',
  transition: 'background 0.3s'
};

export default Layout;