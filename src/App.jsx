import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import LoginUserPage from "./pages/users/LoginUserPage.jsx";
import CreateUserPage from "./pages/users/CreateUserPage.jsx";

// Si estas líneas dan error, es porque el archivo no está en esa carpeta
import CreateProductPage from "./pages/products/CreateProductPage.jsx";
import EditProductPage from "./pages/products/EditProductPage.jsx";
import CreateSupplierPage from "./pages/suppliers/CreateSupplierPage.jsx";
import EditSupplierPage from "./pages/suppliers/EditSupplierPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/users/create" element={<CreateUserPage />} />

        {/* Rutas de Productos */}
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />

        {/* Rutas de Proveedores */}
        <Route path="/suppliers/create" element={<CreateSupplierPage />} />
        <Route path="/suppliers/edit/:id" element={<EditSupplierPage />} />
      </Routes>
    </Router>
  );
}
export default App;