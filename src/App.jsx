import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import LoginUserPage from "./pages/users/LoginUserPage.jsx";
import CreateUserPage from "./pages/users/CreateUserPage.jsx";
// Importaciones de Productos
import CreateProductPage from "./pages/products/CreateProductPage.jsx";
import EditProductPage from "./pages/products/EditProductPage.jsx";
// Importaciones de Proveedores
import CreateSupplierPage from "./pages/suppliers/CreateSupplierPage.jsx";
import EditSupplierPage from "./pages/suppliers/EditSupplierPage.jsx";
// Importaciones de Ventas
import SaleListPage from "./pages/sales/SaleListPage.jsx";
import ProcessSalePage from "./pages/sales/ProcessSalePage.jsx";
// Importaciones de Órdenes (NUEVO)
import OrderListPage from "./pages/orders/OrderListPage.jsx";
import CreateOrderPage from "./pages/orders/CreateOrderPage.jsx";

import InvoiceListPage from "./pages/invoices/InvoiceListPage.jsx";
import CreateInvoicePage from "./pages/invoices/CreateInvoicePage.jsx";

import InventoryStockPage from "./pages/inventory/InventoryStockPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* RUTAS BASE */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/users/create" element={<CreateUserPage />} />

        {/* RUTAS DE PRODUCTOS */}
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />

        {/* RUTAS DE PROVEEDORES */}
        <Route path="/suppliers/create" element={<CreateSupplierPage />} />
        <Route path="/suppliers/edit/:id" element={<EditSupplierPage />} />

        {/* RUTAS DE VENTAS */}
        <Route path="/sales/checkout" element={<ProcessSalePage />} />
        <Route path="/sales/list" element={<SaleListPage />} />

        {/* RUTAS DE ÓRDENES */}
        <Route path="/orders/create" element={<CreateOrderPage />} />
        <Route path="/orders" element={<OrderListPage />} />

        <Route path="/invoices" element={<InvoiceListPage />} />
        <Route path="/invoices/create" element={<CreateInvoicePage />} />

        <Route path="/inventory" element={<InventoryStockPage />} />

        {/* REDIRECCIÓN POR DEFECTO */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;