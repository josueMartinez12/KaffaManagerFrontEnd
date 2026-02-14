import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import ErrorMessage from '../../components/ErrorMessage';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar los productos. Verifica la conexión con el backend.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-4">Cargando inventario...</div>;

  return (
    <div className="products-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Inventario de Productos</h1>
        <Link to="/products/create" style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          + Nuevo Producto
        </Link>
      </div>

      {/* Uso de tu componente ErrorMessage */}
      <ErrorMessage message={error} />

      {!error && products.length === 0 ? (
        <p>No hay productos registrados actualmente.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <thead style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '12px' }}>Nombre</th>
              <th style={{ padding: '12px' }}>Categoría</th>
              <th style={{ padding: '12px' }}>Precio</th>
              <th style={{ padding: '12px' }}>Stock</th>
              <th style={{ padding: '12px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{product.name}</td>
                <td style={{ padding: '12px' }}>{product.category || 'N/A'}</td>
                <td style={{ padding: '12px' }}>${product.price?.toFixed(2)}</td>
                <td style={{ padding: '12px' }}>{product.stock} unidades</td>
                <td style={{ padding: '12px' }}>
                  <Link to={`/products/edit/${product._id}`} style={{ color: '#3b82f6', marginRight: '10px' }}>Editar</Link>
                  <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsPage;