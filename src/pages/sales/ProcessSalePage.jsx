import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Grid, Paper, Typography, TextField, Button, 
  MenuItem, Box, IconButton, Divider, List, ListItem, ListItemText 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProducts } from "../../services/productService";
import { processSale } from "../../services/saleService";

function ProcessSalePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cliente, setCliente] = useState("");
  const [selectedProd, setSelectedProd] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const addToCart = () => {
    const prod = products.find(p => p._id === selectedProd);
    if (!prod) return;
    if (prod.stockActual < quantity) return alert("Stock insuficiente");

    const newItem = {
      producto: prod._id,
      nombre: prod.nombre,
      cantidad: parseInt(quantity),
      precio: prod.precio,
      subtotal: prod.precio * quantity
    };
    setCart([...cart, newItem]);
    setSelectedProd("");
    setQuantity(1);
  };

  const calculateTotal = () => cart.reduce((acc, item) => acc + item.subtotal, 0);

  const handleFinishSale = async () => {
    if (cart.length === 0) return alert("El carrito está vacío");
    const saleData = { cliente, items: cart, total: calculateTotal(), metodoPago: "Efectivo" };
    try {
      await processSale(saleData);
      alert("Venta realizada con éxito");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Error al procesar");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#6f4e37' }}>
        Volver
      </Button>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Seleccionar Café</Typography>
            <TextField fullWidth select label="Producto" value={selectedProd} onChange={(e) => setSelectedProd(e.target.value)} margin="normal">
              {products.map(p => (
                <MenuItem key={p._id} value={p._id}>{p.nombre} (${p.precio})</MenuItem>
              ))}
            </TextField>
            <TextField fullWidth type="number" label="Cantidad" value={quantity} onChange={(e) => setQuantity(e.target.value)} margin="normal" />
            <Button fullWidth variant="contained" onClick={addToCart} sx={{ mt: 2, bgcolor: '#6f4e37', borderRadius: 2 }}>
              Agregar
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Resumen de Venta</Typography>
            <TextField fullWidth label="Nombre del Cliente" variant="standard" value={cliente} onChange={(e) => setCliente(e.target.value)} sx={{ mb: 2 }} />
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {cart.map((item, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton onClick={() => setCart(cart.filter((_, i) => i !== index))}><DeleteIcon /></IconButton>
                }>
                  <ListItemText primary={item.nombre} secondary={`${item.cantidad} x $${item.precio}`} />
                  <Typography fontWeight="bold">${item.subtotal}</Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h5" color="#2e7d32" fontWeight="bold">${calculateTotal().toFixed(2)}</Typography>
            </Box>
            <Button fullWidth variant="contained" size="large" startIcon={<ShoppingCartCheckoutIcon />} onClick={handleFinishSale} sx={{ bgcolor: '#3d2b1f', py: 1.5, borderRadius: 3 }}>
              Finalizar Venta
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProcessSalePage;