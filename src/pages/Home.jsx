import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  ListItem, ListItemButton, ListItemIcon, ListItemText, Container, 
  IconButton, Paper, Button, CircularProgress 
} from "@mui/material";

// Iconos
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LoginIcon from '@mui/icons-material/Login';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HistoryIcon from '@mui/icons-material/History'; // Icono para movimientos

// Importación de componentes de listas
import ProductListPage from "./products/ProductListPage"; 
import SupplierListPage from "./suppliers/SupplierListPage";
import SaleListPage from "./sales/SaleListPage";
import OrderListPage from "./orders/OrderListPage";
import InvoiceListPage from "./invoices/InvoiceListPage";
import InventoryStockPage from "./inventory/InventoryStockPage"; // <--- 1. IMPORTAR INVENTARIO

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Inventario"); // Cambiado a Inventario por defecto

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#6f4e37' }} />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return (
      <Container maxWidth="md">
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 6, background: '#fdfaf6', border: '1px solid #e0d7cc' }}>
            <CoffeeIcon sx={{ fontSize: 80, color: '#6f4e37', mb: 2 }} />
            <Typography variant="h3" fontWeight="800" sx={{ color: '#3d2b1f', mb: 2 }}>Kaffa Manager</Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>Sistema de Gestión de Café</Typography>
            <Button 
                component={RouterLink} 
                to="/login" 
                variant="contained" 
                startIcon={<LoginIcon />}
                sx={{ backgroundColor: '#6f4e37', borderRadius: '30px', px: 5, py: 1.5 }}
            >
              Iniciar Sesión para Administrar
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#3d2b1f' }}>
        <Toolbar>
          <CoffeeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Kaffa Manager</Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>{localStorage.getItem('userName')}</Typography>
          <IconButton color="inherit" onClick={handleLogout}><LogoutIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#fdfaf6' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {/* CONTROL DE INVENTARIO (STOCK) */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Inventario")} selected={activeTab === "Inventario"}>
                <ListItemIcon><InventoryIcon color={activeTab === "Inventario" ? "primary" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Inventario (Stock)" />
              </ListItemButton>
            </ListItem>

            {/* PRODUCTOS (LISTA/CATÁLOGO) */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Productos")} selected={activeTab === "Productos"}>
                <ListItemIcon><CoffeeIcon color={activeTab === "Productos" ? "secondary" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Catálogo Productos" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {/* PROVEEDORES */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Proveedores")} selected={activeTab === "Proveedores"}>
                <ListItemIcon><AgricultureIcon color={activeTab === "Proveedores" ? "success" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Proveedores" />
              </ListItemButton>
            </ListItem>

            {/* VENTAS */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Ventas")} selected={activeTab === "Ventas"}>
                <ListItemIcon><ShoppingCartIcon color={activeTab === "Ventas" ? "warning" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Ventas" />
              </ListItemButton>
            </ListItem>

            {/* ÓRDENES (PEDIDOS) */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Ordenes")} selected={activeTab === "Ordenes"}>
                <ListItemIcon><LocalShippingIcon color={activeTab === "Ordenes" ? "info" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Pedidos / Órdenes" />
              </ListItemButton>
            </ListItem>

            {/* FACTURACIÓN */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Facturas")} selected={activeTab === "Facturas"}>
                <ListItemIcon><ReceiptLongIcon color={activeTab === "Facturas" ? "secondary" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Facturación" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {/* USUARIOS */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Usuarios")} selected={activeTab === "Usuarios"}>
                <ListItemIcon><PeopleIcon color={activeTab === "Usuarios" ? "primary" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f1ea', minHeight: '100vh' }}>
        <Toolbar />
        
        {/* RENDERIZADO CONDICIONAL */}
        {activeTab === 'Inventario' && <InventoryStockPage />} {/* <--- NUEVO */}
        {activeTab === 'Productos' && <ProductListPage />}
        {activeTab === 'Proveedores' && <SupplierListPage />}
        {activeTab === 'Ventas' && <SaleListPage />}
        {activeTab === 'Ordenes' && <OrderListPage />}
        {activeTab === 'Facturas' && <InvoiceListPage />}
        
        {activeTab === 'Usuarios' && (
          <Typography variant="h5">Gestión de Usuarios</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;