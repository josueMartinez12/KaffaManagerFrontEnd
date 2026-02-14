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
import AgricultureIcon from '@mui/icons-material/Agriculture'; // Icono para Proveedores

// Importación de componentes de listas
import ProductListPage from "./products/ProductListPage"; 
import SupplierListPage from "./suppliers/SupplierListPage"; // <-- 1. NUEVA IMPORTACIÓN

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Productos");

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
            {/* OPCIÓN: PRODUCTOS */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Productos")} selected={activeTab === "Productos"}>
                <ListItemIcon><InventoryIcon color={activeTab === "Productos" ? "primary" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Inventario" />
              </ListItemButton>
            </ListItem>

            {/* 2. NUEVA OPCIÓN: PROVEEDORES */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setActiveTab("Proveedores")} selected={activeTab === "Proveedores"}>
                <ListItemIcon><AgricultureIcon color={activeTab === "Proveedores" ? "success" : "inherit"} /></ListItemIcon>
                <ListItemText primary="Proveedores (Fincas)" />
              </ListItemButton>
            </ListItem>

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
        
        {/* 3. LÓGICA DE RENDERIZADO CONDICIONAL */}
        {activeTab === 'Productos' && <ProductListPage />}
        
        {activeTab === 'Proveedores' && <SupplierListPage />}
        
        {activeTab === 'Usuarios' && (
          <Typography variant="h5">Gestión de Usuarios</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;